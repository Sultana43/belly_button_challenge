// Use d3 library to read in samples.json from the URL

//const url = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json");

// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
    //console.log(data);
   //});

// ***Above code was not used as encountered CORS policy which restricted access, so used server rather than running code locally*** //


// Use the list of sample "names" to populate the select option
d3.json("samples.json").then(function(data) {
    let sampleNames = data.samples


// Create a variable that hold the first sample in the array
let result = sampleNames[0];

// Create variables that hold the (i)sample_values, (ii)otu_ids, (iii)otu_labels
let sampleValues = result.sample_values
let otuResults = result.otu_ids
let bacteria = result.otu_labels

// Create ticks for bar chart *To get top 10, need to map in descending order*
let xticks = sampleValues.slice(0,11).reverse();
let yticks = otuResults.slice(0,11).map(entry => `OTU ${entry}`).reverse();
let hoverlables = bacteria.slice(0,11).reverse();

// Create the trace for the bar chart
let barchart = {
    x: xticks,
    y: yticks,
    text: hoverlables,
    type: "bar",
    orientation: "h"

};

let barData = [barchart];

// Create layout for the bar chart
let bartitle = {
    title: `Top 10 OTUs found per subject`

};

// Use Plotly to plot the data with the layout for the bar chart
Plotly.newPlot("bar", barData, bartitle);

//----------------------------------------------------------------------------------------------//

// Create the trace for the bubble chart
let bubblechart = {
x: otuResults,
y: sampleValues,
text: bacteria,
mode: 'markers',
marker:{size:sampleValues,
        color: otuResults,
        colorscale: "Earth"
}

}
 let bubbleData = [bubblechart];

 // Create the layout for the bubble chart
 let bubbletitle = {
    title: 'Size of bacteria cultures',

 };


 // Use Plotly to plot the data with the layout for the bubble chart
 Plotly.newPlot("bubble", bubbleData, bubbletitle);


//-----------------------------------------------------------------------------------------------//

// Display the sample metadata (individual's demographic information)
let metaData = d3.select("#sample-metadata")

 metaData.html(" ")

// Create function for id=selDataset

let dropDown = d3.select("#selDataset")

let names = data.names

for (i=0; i < names.length; i ++ )
    {dropDown.append("option").text(names[i]).property("value", names[i])

    }

// Display each key-value pair for the sample metadata
demoInformation = data.metadata[0];

metaDataString = ""

for (x in demoInformation)
{metaDataString += x + ":" + demoInformation[x] + "\n" + "<br>"

}

metaData.html(metaDataString)


});


//-----------------------------------------------------------------------------------------------------//

// NOW TO USE THE ABOVE CODE FOR OPTION CHANGES FUNCTION (so subject ID can be changed and all corresponding charts will populate with new ID data):

function optionChanged(id) {d3.json("../../samples.json").then(function(data) {
    let sampleNames = data.samples


// Create a variable that hold the first sample in the array
let result = sampleNames.filter(entry => entry.id == id)[0];

// Create variables that hold the (i)sample_values, (ii)otu_ids, (iii)otu_labels
let sampleValues = result.sample_values
let otuResults = result.otu_ids
let bacteria = result.otu_labels

// Create ticks for bar chart *To get top 10, need to map in descending order
let xticks = sampleValues.slice(0,11).reverse();
let yticks = otuResults.slice(0,11).map(entry => `OTU ${entry}`).reverse();
let hoverlables = bacteria.slice(0,11).reverse();

// Create the trace for the bar chart
let barchart = {
    x: xticks,
    y: yticks,
    text: hoverlables,
    type: "bar",
    orientation: "h"

};

let barData = [barchart];

// Create layout for the bar chart
let bartitle = {
    title: `Top 10 OTUs found per subject`

};

// Use Plotly to plot the data with the layout for the bar chart
Plotly.newPlot("bar", barData, bartitle);

//----------------------------------------------------------------------------------------------------------------//

// Create the trace for the bubble chart
let bubblechart = {
x: otuResults,
y: sampleValues,
text: bacteria,
mode: 'markers',
marker:{size:sampleValues,
        color: otuResults,
        colorscale: "Earth"
}

}
 let bubbleData = [bubblechart];

 // Create layout for bubble chart
 let bubbletitle = {
    title: 'Size of bacteria cultures',

 };

 //Use Plotly to plot the data with the layout for the bubble chart
 Plotly.newPlot("bubble", bubbleData, bubbletitle);


//----------------------------------------------------------------------------------------------------------------//

// Display the sample metadata (individual's demographic information)
let metaData = d3.select("#sample-metadata")

 metaData.html(" ")


// Display each key-value pair for the sample metadata
demoInformation = data.metadata.filter(entry => entry.id == id)[0];

metaDataString = ""

for (x in demoInformation)
{metaDataString += x + ":" + demoInformation[x] + "\n" + "<br>"

}

metaData.html(metaDataString)
});

//-----------------------------------------------------------------------------------------------------------------//

// Create variable for holding washing frequency for gauge chart
let sampleMetadata = data.metaData;
let metadataAarray = sampleMetadata.filter(entry => entry.id == id)[0]
let washingFreq = metadataArray["wfreq"];

// Create trace for gauge chart


// Create layout for gauge chart


// Use Plotly to plot the data and layout for the gauge chart


}

//--------------------------------------------------------------------------------------------//