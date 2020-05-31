import React from 'react';
import {  render, unmountComponentAtNode } from 'react-dom';
import CardBoxContainer from './index';
import { act } from 'react-dom/test-utils';

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should appears a list", () => {
    const characters = [
        {
            char_id: 1,
            name: 'Walter White',
            img: 'https://example.com/avatar.png',
            occupation: ['Father']
        },
        {
            char_id: 2,
            name: 'Walter White',
            img: 'https://example.com/avatar.png',
            occupation: ['Father']
        }
    ];

    act(() => {
        render(<CardBoxContainer characters={characters} />, container);
    });

})

it ("should appears nothing", () => {
    act(() => {
        render(<CardBoxContainer />, container)
    });

    expect(container.textContent).toBe("");  
})

it("should show no data available", () => {
    act(() => {
        render(<CardBoxContainer characters={[]}/>, container)
    });

    expect(container.textContent).toBe("No data available!");
});