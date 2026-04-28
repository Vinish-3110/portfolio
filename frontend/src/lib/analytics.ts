'use client';

import { sendGAEvent } from '@next/third-parties/google';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const sendEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent('event', eventName, params);
};

export const trackButtonClick = (label: string, params: AnalyticsParams = {}) => {
  sendEvent('button_click', {
    button_label: label,
    ...params,
  });
};

export const trackFormSubmit = (formName: string, params: AnalyticsParams = {}) => {
  sendEvent('form_submit', {
    form_name: formName,
    ...params,
  });
};

export const trackProjectView = (projectId: string, projectTitle: string) => {
  sendEvent('project_view', {
    project_id: projectId,
    project_title: projectTitle,
  });
};
