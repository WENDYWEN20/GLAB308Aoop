async function backfillUserRequests(records, batchSize = 500) {
  let processed = 0;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);

    const operations = batch.map((record) => ({
      updateOne: {
        filter: { externalRequestId: record.externalRequestId },
        update: {
          $set: {
            requesterId: record.requesterId,
            approverId: record.approverId,
            requestType: record.requestType,
            status: record.status,
            priority: record.priority,
            title: record.title,
            description: record.description,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(record.createdAt),
            approvalHistory: record.approvalHistory || [],
          },
        },
        upsert: true,
      },
    }));

    const result = await UserRequest.bulkWrite(operations, {
      ordered: false,
    });

    processed += batch.length;

    console.log({
      processed,
      matched: result.matchedCount,
      modified: result.modifiedCount,
      upserted: result.upsertedCount,
    });

    // Optional small delay to avoid overwhelming the DB
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

const operations = records.map((record) => ({
  updateOne: {
    filter: { externalRequestId: record.externalRequestId },
    update: {
      $set: {
        requesterId: record.requesterId,
        approverId: record.approverId,
        requestType: record.requestType,
        status: record.status,
        priority: record.priority,
        title: record.title,
        description: record.description,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(record.createdAt),
        approvalHistory: record.approvalHistory || [],
      },
    },
    upsert: true,
  },
}));

await UserRequest.bulkWrite(operations, {
  ordered: false,
});