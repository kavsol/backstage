/*
 * Copyright 2021 The Backstage Authors
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
 */

import { AnalyticsApi, AnalyticsEvent } from '@backstage/core-plugin-api';

/**
 * Mock implementation of {@link core-plugin-api#AnalyticsApi} with helpers to ensure that events are sent correctly.
 * Use getEvents in tests to verify captured events.
 *
 * @public
 * @deprecated Use {@link @backstage/test-utils#mockApis.(analytics:namespace)} instead
 */
export class MockAnalyticsApi implements AnalyticsApi {
  private events: AnalyticsEvent[] = [];

  captureEvent(event: AnalyticsEvent) {
    const { action, subject, value, attributes, context } = event;

    this.events.push({
      action,
      subject,
      context,
      ...(value !== undefined ? { value } : {}),
      ...(attributes !== undefined ? { attributes } : {}),
    });
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }
}
