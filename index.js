const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

exports.handler = async (event, context, callback) => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    const httpRequest = ((event || {}).requestContext || {}).http || {};
    switch (httpRequest.method) {
        case 'GET':
            switch (httpRequest.path) {
                case '/':
                    console.log('GET / - echo');
                    return buildMessageResponse(200, {event: event, context: context, callback: callback});
                default:
                    console.error('Unknown GET path', httpRequest);
                    return buildMessageResponse(404, 'Unknown GET path');
            }
        case 'POST':
            const body = event.body ? JSON.parse(event.body) : {};
            switch (httpRequest.path) {
                case '/':
                    console.log('POST / - echo', body);
                    return buildMessageResponse(200, {event: event, context: context, callback: callback});
                case '/v1/image':
                    console.log('POST /v1/image', body);
                    return generateChartImage(body.metadata, body.data);
                default:
                    console.error('Unknown GET path', httpRequest);
                    return buildMessageResponse(404, 'Unknown GET path');
            }
        default:
            console.error('Unknown HTTP method', httpRequest);
            return buildMessageResponse(400, 'Unknown HTTP method');
    }
};

function buildMessageResponse(statusCode, message) {
    const response = {
        statusCode: statusCode,
        headers: {"content-type": "application/json"},
        body: {message: message},
    };
    return response;
}

function chartCallback(ChartJS) {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
}

function generateChartImage(metadata, data) {
    const chartJsOptions = {
        width: metadata.width,
        height: metadata.height,
        chartCallback: chartCallback,
        backgroundColour: metadata.bgColor
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas(chartJsOptions);
    const image = chartJSNodeCanvas.renderToDataURL(data);
    return image;
}