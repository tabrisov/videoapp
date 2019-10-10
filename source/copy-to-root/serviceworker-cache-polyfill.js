/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function () {
  const nativeAddAll = Cache.prototype.addAll;
  const userAgent = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);

  // Has nice behavior of `var` which everyone hates
  const agent = (userAgent) ? userAgent[1] : null;
  const version = (userAgent) ? parseInt(userAgent[2], 10) : null;

  if (
    nativeAddAll && (!userAgent ||
      (agent === 'Firefox' && version >= 46) ||
      (agent === 'Chrome' && version >= 50)
    )
  ) {
    return;
  }

  Cache.prototype.addAll = function addAll(requests) {
    const cache = this;

    // Since DOMExceptions are not constructable:
    function NetworkError(message) {
      this.name = 'NetworkError';
      this.code = 19;
      this.message = message;
    }

    NetworkError.prototype = Object.create(Error.prototype);

    return Promise.resolve().then(function () {
      if (arguments.length < 1) {
        throw new TypeError();
      }

      // Simulate sequence<(Request or USVString)> binding:
      // const sequence = [];

      requests = requests.map(function (request) {
        return (request instanceof Request) ? request : String(request);
      });

      return Promise.all(
        requests.map(function (request) {
          if (typeof request === 'string') {
            request = new Request(request);
          }

          const scheme = new URL(request.url).protocol;

          if (scheme !== 'http:' && scheme !== 'https:') {
            throw new NetworkError('Invalid scheme');
          }

          return fetch(request.clone());
        })
      );
    }).then(function (responses) {
      // If some of the responses has not OK-eish status,
      // then whole operation should reject
      if (responses.some(function (response) {
        return !response.ok;
      })) {
        throw new NetworkError('Incorrect response status');
      }

      // TODO: check that requests don't overwrite one another
      // (don't think this is possible to polyfill due to opaque responses)
      return Promise.all(
        responses.map(function (response, i) {
          return cache.put(requests[i], response);
        })
      );
    }).then(function () {
      return null;
    });
  };

  Cache.prototype.add = function add(request) {
    return this.addAll([request]);
  };
}());
