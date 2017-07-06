# adf-and-javascript
Explorations into using JavaScript with and in ADF Faces 12c - to enrich, make leaner and smoother, use 3rd party components, leverage HTML5, benefit from simpler implementation and have smart client to server and server to client interactions.

Included are:
* JavaScript initializing ADF Faces components into new HTML5 components (inputText for number, range, text with placeholder, text with datalist)
* Enforce only uppercase input into component
* Extended field editor appearing in popup component for inputText - opened with double click and Alt-E keyboard
* Table (grid) with arrow based navigation, wrap around navigation and column and row aggregation
* Table based on data binding (placeholder data control) with double click handler to open detail form for current row
* Send fire and forget messages from client to server
* Request partial update with latest information - triggered keyboard event in the client 
* intra-page navigation using buttons and keys (even to headings inside rich text editor); 
* Client Event Bus - generic facility for exchanging events across decoupled components (client side equivalent to contextual events); also: publish client event from server side (managed bean) in partial page refresh