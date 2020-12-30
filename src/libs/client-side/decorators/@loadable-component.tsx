import React, { Component } from 'react';
import loadable from '@loadable/component';

export const LoadableComponent = (component: Component) => {
    return loadable(() => component, { feedback: <>加载中</> });
};
