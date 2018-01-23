// Configure graphics
var width = 1800,
    height = 900;

var colorScheme = ["#35518d", "#59e11b", "#9620d7", "#b7c600", "#0153fc","#e2c607", "#b952ff","#008f40", "#d350df", 
"#6e8600", "#5f34bd", "#ffad29", "#0073f1","#ff492d", "#01ccfc", "#b72500", "#0088d0", "#c16900", "#a38aff", "#acd27f", 
"#fa0072", "#00b29b", "#fa0059", "#006936", "#8b3992", "#d3c87b", "#5244a2", "#fcb972", "#a0c0ff", "#ad5400", "#c7557d",
"#5b5400", "#b50032", "#989760", "#ff7154", "#8b3642", "#ff925e","#903611", "#ff908c", "#c5936f"];


var links = [{"source": 0, "target": 7}, {"source": 0, "target": 18}, {"source": 0, "target": 29}, {"source": 1, "target": 11}, {"source": 2, "target": 6}, {"source": 2, "target": 16}, {"source": 3, "target": 14}, {"source": 4, "target": 0}, {"source": 5, "target": 8}, {"source": 5, "target": 4}, {"source": 5, "target": 21}, {"source": 5, "target": 27}, {"source": 5, "target": 9}, {"source": 5,  "target": 24}, {"source": 6,  "target": 0}, {"source": 7,  "target": 2}, {"source": 8, "target": 23}, {"source": 9, "target": 22}, {"source": 10, "target": 14}, {"source": 10, "target": 5}, {"source": 11, "target": 14}, {"source": 12, "target": 2}, {"source": 13, "target": 0}, {"source": 14, "target": 13}, {"source": 14, "target": 20}, {"source": 14, "target": 30}, {"source": 14, "target": 9}, {"source": 15, "target": 2}, {"source": 16, "target": 0}, {"source": 17, "target": 5}, {"source": 18, "target": 14}, {"source": 19, "target": 5}, {"source": 20, "target": 1}, {"source": 21, "target": 26}, {"source": 22, "target": 17}, {"source": 22, "target": 3}, {"source": 22, "target": 12}, {"source": 22, "target": 15}, {"source": 22, "target": 31}, {"source": 22, "target": 10}, {"source": 23, "target": 25}, {"source": 23, "target": 28}, {"source": 24, "target": 14}, {"source": 25, "target": 23}, {"source": 25, "target": 5}, {"source": 26, "target": 19}, {"source": 27, "target": 0}, {"source": 28, "target": 5}, {"source": 29, "target": 5}, {"source": 30, "target": 2}, {"source": 31, "target": 2}];

var nodes = [{"label": "mctest", "group": "mctest", "id": 0}, {"label": "copy_service", "group": "microservice", "id": 1}, {"label": "config_copy_service", "group": "kafka", "id": 20}, {"label": "copy_manager_results_docker_dispatcher", "group": "kafka", "id": 3}, {"label": "error_describe_location_service", "group": "kafka", "id": 4}, {"label": "location_manager", "group": "microservice", "id": 5}, {"label": "error_files_identified", "group": "kafka", "id": 6}, {"label": "config_item_identification_manager", "group": "kafka", "id": 7}, {"label": "config_location_monitor_service", "group": "kafka", "id": 8}, {"label": "request_docker_dispatcher", "group": "kafka", "id": 9}, {"label": "results_docker_dispatcher", "group": "kafka", "id": 10}, {"label": "shutdown", "group": "kafka", "id": 31}, {"label": "results_copy_service", "group": "kafka", "id": 11}, {"label": "confirm_shutdown", "group": "kafka", "id": 12}, {"label": "errors_files_copied", "group": "kafka", "id": 13}, {"label": "copy_manager", "group": "microservice", "id": 14}, {"label": "config_copy_manager", "group": "kafka", "id": 18}, {"label": "item_identification_manager_results_docker_dispatcher", "group": "kafka", "id": 15}, {"label": "location_manager_results_docker_dispatcher", "group": "kafka", "id": 17}, {"label": "results_describe_location_service", "group": "kafka", "id": 19}, {"label": "config_describe_location_service", "group": "kafka", "id": 21}, {"label": "error_location_monitor_service", "group": "kafka", "id": 27}, {"label": "item_identification_manager", "group": "microservice", "id": 2}, {"label": "location_monitor_service", "group": "microservice", "id": 23}, {"label": "files_ready_at_location", "group": "kafka", "id": 24}, {"label": "files_to_monitor", "group": "kafka", "id": 25}, {"label": "docker_dispatcher", "group": "microservice", "id": 22}, {"label": "describe_location_service", "group": "microservice", "id": 26}, {"label": "files_identified", "group": "kafka", "id": 16}, {"label": "config_location_manager", "group": "kafka", "id": 29}, {"label": "files_copied", "group": "kafka", "id": 30}, {"label": "results_location_monitor_service", "group": "kafka", "id": 28}];

var colors = d3.scale.ordinal().range(colorScheme);

// initialize links
// links.forEach(d => {
//     d.source = nodes[d.source]
//     d.target = nodes[d.target]
// })

// create SVG container
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(d3.behavior.zoom().on('zoom', () => {
        svg.attr('transform', 'translate(' + d3.event.translate +')' + ' scale(' + d3.event.scale + ')')
    }))
    .on('dblclick.zoom', null)
    .on('click', () => {
        node.style('opacity', 1)
        path.style('opacity', 1)
    })
    .append('g')

    // https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
var systemLayout = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance(100)
    .charge(-300)
    .on('tick', tick)
    .start();

var stickyDrag = systemLayout.drag()
    .on('dragstart', dragstart);

function dragstart() {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed('fixed', d => d.fixed = true);
}
// building arrow
svg.append("defs").selectAll("marker")
    .data(["mid"])
    .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 12)
    .attr("orient", "auto")
    .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
    .style("stroke", "#5f6c7a").style('stroke-width', 2)

// insert links and arrows

var path = svg.append('g')
    .selectAll('path').data(systemLayout.links())
    .enter().append('polyline')
        .classed('link', true)
        .style('stroke', '#778899').style('stroke-width', 1.5)
        .style('fill', 'none')
        // .style('stroke', '#4679BD').style('stroke-width', 1.5)
        // .style('fill', 'none')
        .attr('marker-mid', 'url(#mid)');

// define nodes
var node = svg.selectAll('.node')
    .data(systemLayout.nodes())
    .enter().append('g')
        .attr('class', d => d.group)
        .classed('node', true)
        .call(systemLayout.drag);

// add nodes
node.append('circle')
    .attr('r', 8)
    .attr('class', d => d.group)
    .on('dblclick', d => {
        node.style('opacity',  (o) => {
            return areNeighbours(d, o) | areNeighbours(o, d) ? 1 : 0.3;
        });
        path.style('opacity', (o) => {
            return d.index === o.source.index | d.index === o.target.index ? 1 : 0.1
        })
    });
node.selectAll('.kafka')
    .attr('class', d=> d.label) // reclass as by queue_name
    .attr('r', 6) // reclass as by queue_name
    // .style('fill', 'maroon')
    .style('fill', d => colors(d.label)) // use the color scheme to assign colors
node.selectAll('.microservice')
    .style('fill', 'black')
    .style('stroke', 'pink')
    .style('stroke-width', 2);
node.select('.mctest')
    .attr('r', 12)
    .style('fill', 'white');

// add labels
node.append('text')
    .classed('labels', true)
    .attr('x', 8)
    .attr('dy', '.35em')
    .text(d => d.label)
    .style('fill', 'white')

/* Highlights neighbours of selected node */

// stores who's connected to whom
var linkedByIndex = {}
for (i = 0; i < systemLayout.nodes().length; ++i) {
    linkedByIndex[i + ',' + i] = 1; // each node is connected to itself    
};
systemLayout.links().forEach( d => {
    linkedByIndex[d.source.index + ',' + d.target.index] = 1;
});
function areNeighbours (a, b) {
    return linkedByIndex[a.index + ',' + b.index];
}

function highlightNeighbours() {
    d = d3.select(this).datum();
    node.style('opacity', function (o) {
        return areNeighbours(d, o) | areNeighbours(o, d) ? 1 : 0.3;
    });
    path.style('opacity', function (o) {
        return d.index === o.source.index | d.index === o.target.index ? 1 : 0.1
    });
}


function tick() {
    path
    .attr("points", function(d) {
        return d.source.x + "," + d.source.y + " " + 
            (d.source.x + d.target.x)/2 + "," + (d.source.y + d.target.y)/2 + " " +
            d.target.x + "," + d.target.y; });
    node.attr('transform', d=> {
        return "translate(" + d.x + "," + d.y + ")"
    })
}