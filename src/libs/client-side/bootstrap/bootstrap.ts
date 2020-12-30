import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface bootstrapProperty {
    rootSelector?: string;
}

export const bootstrap = (rootComponent: Component, property: bootstrapProperty) => {
    // ReactDOM.render(rootComponent, document.getElementById(property?.rootSelector || '#root'));
};
