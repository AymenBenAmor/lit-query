import {CacheController, CacheInstance} from './cache';

const statuses = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  refetching: 'refetching',
  error: 'error',
}

const defaultConfig = {
  autoCall: false,
  key: Math.random(),
}

export class AsyncController {
  constructor(host, asyncFn, config = defaultConfig) {
    this._host = host;
    this._config = config;
    this._asyncFn = asyncFn;
    this.status = statuses.idle;
    this._host.addController(this);
    this._cache = CacheInstance
    this._cache.addToObservers(config.key, this)
    this._run = this._run.bind(this);
  }

  async _run() {
    try {
      this.status = statuses.loading;
      this.result = await this._asyncFn();
      this.status = statuses.success;
    } catch (e) {
      this.error = e;
    }
  }

  set status(status) {
    this._status = status;
    this._host.requestUpdate();
  }

  get status() { return this._status; }

  set result(result) {
    this._result = result;
    this.status = statuses.success;
  }

  get result() { return this._result; }

  get isLoading() { return this._status === statuses.loading }

  get isError() { return this._status === statuses.error }

  get isSuccess() { return this._status === statuses.success }

  get isRefetching() { return this._status === statuses.refetching }

  get run() { return this._run }

  set error(error) {
    this._error = error;
    this.status = statuses.error;
  }

  get error() { return this._error; }

  hostConnected() {
    const { autoCall } = this._config;
    if (autoCall) {
      this.run();
    }
  }
}
