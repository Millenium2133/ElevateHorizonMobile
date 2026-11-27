// Override this at build time to point the app at a local or staging API.
const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? 'https://grmobile.onrender.com'
).replace(/\/+$/, '');
const REQUEST_TIMEOUT_MS = 45000;

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function requestJson(path, { method = 'GET', body } = {}) {
  // Keep timeout, JSON parsing, and server-error handling consistent for every endpoint.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers = { Accept: 'application/json' };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const responseText = await response.text();
    let responseBody = null;

    if (responseText) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        if (response.ok) {
          throw new ApiError('The server returned an invalid response.', response.status);
        }
      }
    }

    if (!response.ok) {
      const message = typeof responseBody?.message === 'string'
        ? responseBody.message
        : typeof responseBody?.error === 'string'
          ? responseBody.error
          : `The request failed (${response.status}).`;
      throw new ApiError(message, response.status);
    }

    return responseBody;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'AbortError') {
      throw new ApiError('The server took too long to respond. Please try again.');
    }
    throw new ApiError('Unable to connect to the server. Check your connection and try again.');
  } finally {
    clearTimeout(timeout);
  }
}

function formatDate(date) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;

  // Format date-only values in UTC so local timezone offsets cannot change the day.
  const [, year, month, day] = match;
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));
}

function formatTime(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return time;

  const [, hours, minutes] = match;
  return new Intl.DateTimeFormat('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(2020, 0, 1, Number(hours), Number(minutes))));
}

function normalizeEvent(event, index) {
  if (
    event === null
    || typeof event !== 'object'
    || !['number', 'string'].includes(typeof event.id)
    || typeof event.title !== 'string'
    || typeof event.date !== 'string'
    || typeof event.startTime !== 'string'
  ) {
    throw new ApiError(`The event at position ${index + 1} has an invalid format.`);
  }

  // Preserve the server fields and add display strings for the event cards and details.
  const times = [event.startTime, event.endTime]
    .filter((time) => typeof time === 'string' && time.length > 0)
    .map(formatTime);

  return {
    ...event,
    displayDate: formatDate(event.date),
    displayTime: typeof event.time === 'string'
      ? event.time
      : times.join(' - '),
  };
}

export async function getEvents() {
  const response = await requestJson('/events');
  if (!Array.isArray(response)) {
    throw new ApiError('The server returned an invalid events list.');
  }

  return response.map(normalizeEvent);
}

export function createRegistration(registration) {
  return requestJson('/registrations', {
    method: 'POST',
    body: registration,
  });
}

export function createUser(user) {
  return requestJson('/users', {
    method: 'POST',
    body: user,
  });
}
