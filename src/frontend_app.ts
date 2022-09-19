// This file will be compiled and put in the frontend folder

async function fetchURLs() {
  // fetch URLs for the resources to be downloaded from the api
  try {
    const resonse = await fetch('/api/getURLs');
    const data: Array<string> = await resonse.json();
    return data;
  } catch (error) {
    throw new Error(`Error while fethcing the URLs:  ${error}`);
  }
}

function populateLinksList(linksListElement: Element, URLArray: Array<string>) {
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

async function main() {
  const URLArray = await fetchURLs();
  const linksListElement = document.querySelector('#links-list');
  populateLinksList(linksListElement as Element, URLArray);
  /////////////////////////////////////////////
  const body = document.querySelector('body');
  body?.appendChild(linksListElement as Element);
}

main().then(() => {
  console.log('Done');
});
