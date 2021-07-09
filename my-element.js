/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {AsyncController} from './AsyncController';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  constructor() {
    super();
    this.call1 = new AsyncController(this, this.getPokemons, {
      autoCall: true
    });
  }

  getPokemons() {
    return fetch('https://pokeapi.co/api/v2/pokemon').then(response => response.json())
  }

  render() {
    const { status, error, result, isError, isLoading, isSuccess, isRefetching, run } = this.call1;
    if (isLoading) {
      return html`<span>Loading...</span>`;
    }

    if (isError) {
      return html`<span>Error: ${error.message}</span>`;
    }

    return isSuccess ? html`
      <span>
        ${JSON.stringify(result)}
      </span>
      <button @click=${() => run()} >Click me to refresh</button>
    ` : ''
  }
}

window.customElements.define('my-element', MyElement);
