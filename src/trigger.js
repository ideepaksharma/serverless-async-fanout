const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const items = body.items || [];

        // Publish each message to SNS - it will automatically fan out to all subscribed queues
        const publishPromises = items.map(item =>
            sns.publish({
                TopicArn: process.env.SNS_TOPIC_ARN,
                Message: JSON.stringify(item)
            }).promise()
        );

        await Promise.all(publishPromises);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Successfully initiated processing for ${items.length} items`
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error processing request',
                error: error.message
            })
        };
    }
};