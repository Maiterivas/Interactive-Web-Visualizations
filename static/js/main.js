const url = 

function metadata_info(selected_value) {
    d3.json(url+selected_value).then((data) => {
        var metadata= data.metadata;
        var array = metadata.filter(sample => sample.id == sample_value);
        
        // select sample metadata using id tag in index html
        var selectvalue = d3.select("#sample-metadata");
        // .html("") clears any previous metadata info
        selectvalue.html("");
        Object.entries(result).forEach(([a, b]) => {
        selectsample.append("h5").text(`${a}: ${b}`);
      });
    });
}