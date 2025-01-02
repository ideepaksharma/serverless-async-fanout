module.exports.handler = async (event) => {
    try {
        for (const record of event.Records) {
            const item = JSON.parse(record.body);
            console.log('Processing item in Queue One:', item);

            // Queue One specific processing
            await processItemInQueueOne(item);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully processed messages in Queue One'
            })
        };
    } catch (error) {
        console.error('Error in Queue One processor:', error);
        throw error;
    }
};

async function processItemInQueueOne(item) {
    // Add your Queue One specific processing logic
    console.log('Queue One processing:', item);
    await new Promise(resolve => setTimeout(resolve, 1000));
}