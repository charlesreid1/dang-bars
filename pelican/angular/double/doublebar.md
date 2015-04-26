This double bar chart is a nice example of how Angular.js directives
can make charts into components that are reusable and that are 
completely abstracted from the main page layout. 

For example, the two bar charts above are drawn the same way, so they use 
the same D3 code. But just before the data is passed into the chart-drawing 
function, it is sorted alphabetically by letter, or in order by frequency.

<br />
<br />

The HTML code for these two bar charts is:

<br />
<br />

<code>&lt;double-bar-chart sort="alpha"&gt;&lt;/double-bar-chart&gt;</code>
<br />
<code>&lt;double-bar-chart sort="frequency"&gt;&lt;/double-bar-chart&gt;</code>

<br />
<br />

Simple as that!


