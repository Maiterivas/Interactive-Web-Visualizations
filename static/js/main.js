//locate where the samples data is and save to variable
const url = "data/samples.json"

//testing getting data using d3 request
d3.json(url).then((data) => {
metadata = data;
console.log(metadata);

});

//Changes Option in HTML
function optionChanged(sample_value) {
    buildBarChart(sample_value);
    buildBubbleChart(sample_value);
    metadata_info(sample_value);
}

//function will initialize value selection
function init() {
  // get the data from samples.json and add names as value options for visualizations
  d3.json(url).then((data) => {
    var all_samples = data.samples
    // save the html id to a variable to update it within
    var sel_dataset = d3.select("#selDataset");
  
    //loop through saved samples so it can build charts
    for (i = 0; i < all_samples.length; i++) {
      var sample_update = 
      sel_dataset
      .append("option")
      //specify i value to use from loop
      .text(`${all_samples[i].id}`);
      // update current value of sample
      sample_update.property("value", all_samples[i].id);
    }
    
    //initialize charts with first ID sample value
    buildBarChart(all_samples[0].id);
    buildBubbleChart(all_samples[0].id);
    metadata_info(all_samples[0].id);
        
  });
  
      
      
};

//Build Metadata Info
function metadata_info(sample_value) {
  d3.json(url).then((data) => {
    //save metadata
    var metadata = data.metadata;
    //make a filter so it saves selection for each sample id
    var sample_select = metadata.filter(value => value.id == sample_value);
    var sample_result = sample_select[0]
    var sample_metadata = d3.select("#sample-metadata");
    //clear out previous entries
    sample_metadata.html("");
    Object.entries(sample_result).forEach(([key, pair]) => {
    sample_metadata.append("h5").text(`${key}: ${pair}`);
  });
});
}

//Bubble Chart
function buildBubbleChart(sample_value) {
  d3.json(url).then((data) => {
    //filter data so it generates with the selected sample, and initialize with 0
    var sample_info = data.samples.filter(value => value.id == sample_value)[0]
    var trace1 = [{
      x: sample_info.otu_ids,
      y: sample_info.sample_values,
      text: sample_info.otu_labels,
      mode: 'markers',
      marker: {
        size: sample_info.sample_values,
        color: sample_info.otu_ids
      }
    }];
    
    var layout = {
      xaxis: {title: 'OTU ID'}
    };
    
    Plotly.newPlot('bubble', trace1, layout);
  });
};

//Bar Chart
function buildBarChart(sample_value) {
  d3.json(url).then((data) => {
    //filter data so it generates with the selected sample, and initialize with 0
    var sample_info = data.samples.filter(value => value.id == sample_value)[0]
    var sample_values = sample_info.sample_values
    var sample_labels = sample_info.otu_ids

    //The data is too big for the bar chart, values must be sliced
    sliced_values = sample_values.slice(0, 10);
    sliced_labels = sample_labels.slice(0, 10);
    //Sort the labels using map and add "OTU" to identify OTU
    sliced_labels = sliced_labels.map(L => "OTU " + L)
    //Reverse the order to match ReadMe figure
    sliced_values.reverse();

    var trace1 = {
      x: sliced_values,
      y: sliced_labels,
      type: "bar",
      orientation: "h",
    };

    let trace2 = [trace1];

    Plotly.newPlot("bar", trace2)
  });
};

//initialize init function by calling it
init();