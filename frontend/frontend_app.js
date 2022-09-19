"use strict";
// This file will be compiled and put in the frontend folder
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchURLs() {
    return __awaiter(this, void 0, void 0, function* () {
        // fetch URLs for the resources to be downloaded from the api
        try {
            const resonse = yield fetch('/api/getURLs');
            const data = yield resonse.json();
            return data;
        }
        catch (error) {
            throw new Error(`Error while fethcing the URLs:  ${error}`);
        }
    });
}
function populateLinksList(linksListElement, URLArray) {
    // create <div> element for every <a> and append it to the <section> element
    URLArray.forEach((URL) => {
        const anchorContainer = document.createElement('div');
        const anchor = document.createElement('a');
        // then set attributes for <div> and <a>
        anchorContainer.classList.add('link-container');
        anchor.textContent = URL;
        anchor.href = `/api/download/${URL}`;
        anchorContainer.appendChild(anchor);
        linksListElement.appendChild(anchorContainer);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const URLArray = yield fetchURLs();
        const linksListElement = document.querySelector('#links-list');
        populateLinksList(linksListElement, URLArray);
        /////////////////////////////////////////////
        const body = document.querySelector('body');
        body === null || body === void 0 ? void 0 : body.appendChild(linksListElement);
    });
}
main().then(() => {
    console.log('Done');
});
