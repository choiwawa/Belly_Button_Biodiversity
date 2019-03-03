// Create function to retrieve new data every time a new sample is selected
function optionChanged(newSample) {
    getData(newSample, createCharts);
}

//Create function to build pie and bubble charts
function createCharts(sample, OTU) {
    // Use map to filter through sample data to find OTU taxonomic name
    var taxonomicName = sample[0]["otu_ids"].map(name => OTU[name]);
    var chartValues = sample[0]["sample_values"].slice(0, 10);
    var chartLabels = sample[0]["otu_ids"].slice(0, 10);
    // Create pie chart
    var pieChart = {
        values: chartValues,
        labels: chartLabels,
        hovertext: taxonomicName.slice(0, 10),
        hoverinfo: "hovertext",
        type: "pie"
    };
    var pieData = [pieChart];
    var pieLayout = {
        margin: {
            t: 0,
            l: 0
        }
    };
    var PIE = document.getElementById("pie");
        Plotly.newPlot(PIE, pieData, pieLayout);

    // Create bubble chart
    var bubbleChart = {
        x: sample[0]["otu_ids"],
        y: sample[0]["sample_values"],
        text: taxonomicName,
        mode: "markers",
        marker: {
            size: sample[0]["sample_values"],
            color: sample[0]["otu_ids"],
            colorscale: "Earth"
        }
    };
    var bubbleData = [bubbleChart]
    var bubbleLayout = {
        margin: {
            t: 0
        },
        hovermode: "closest",
        xaxis: {
            title: "OTU ID"
        }
    };
    var BUBBLE = document.getElementById("bubble");
    Plotly.newPlot(BUBBLE, bubbleData, bubbleLayout);
}

