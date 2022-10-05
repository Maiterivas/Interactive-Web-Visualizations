//locate where the data is
const url = "data/samples.json"

//testing getting data
d3.json(url).then((data) => {
metadata = data;
console.log(metadata);

});


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
      
        
  });
  
      //initialize charts with first ID sample value
      buildBarChart(all_samples[0].id);
      buildBubbleChart(all_samples[0].id);
      metadata_info(all_samples[0].id);
};
  
  
//initialize init function by calling it
init();

function metadata_info(sample_value) {
  d3.json(url).then((data) => {
    //save metadata
    var metadata = data.metadata;
    //save selections for each subject
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