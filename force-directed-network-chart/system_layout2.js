var container2;
var SL_height = 400, SL_width = 500;
var SL_Edges, SL_Nodes, forceGraph;
var SL_path, SL_node;
var SL_nodeGroup;

// create svg container
function setup_system_layout() {
// container
    container2 = d3.select("#systemlayout").append('svg')
      .attr('width', SL_width)
      .attr('height', SL_height)
      .append('g');
// build arrow
    container2.append('def').selectAll('marker')
      .data(["mid"])
      .enter().append('marker')
      .attr("id", function(d) { return d; })
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 25)
          .attr("refY", 0)
          .attr("markerWidth", 6)
          .attr("markerHeight", 12)
          .attr("orient", "auto")
          .append("path")
              .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
          .style("stroke", "#5f6c7a").style('stroke-width', 2);
  //SL_nodeGroup= container2.append('g').classed('node-group', true);
}
function createSystemLayout(){
// force layout
    systemlayout = d3.forceSimulation(SL_Nodes)
      .force('link', d3.forceLink(SL_Edges))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('collide', d3.forceCollide().radius(40))
      .force('center', d3.forceCenter(SL_width/2, SL_height/2));
      //.on('tick', ticked)
}
function drawLinks() {
    SL_path = container2.append('g')
        .classed('sys-path', true)
        .selectAll('polyline').data(SL_Edges)
        .enter().append('polyline')
            .classed('link', true)
            .style('stroke', '#778899').style('stroke-width', 1.5)
            .attr('marker-mid', 'url(#mid)');
}
//function ticked() {
  //SL_path.attr("points", function(d) {
        //return d.source.x + "," + d.source.y + " " + 
                //(d.source.x + d.target.x) / 2 + "," + (d.source.y + d.target.y) / 2 + " " +
                //d.target.x + "," + d.target.y;
    //});
//}
