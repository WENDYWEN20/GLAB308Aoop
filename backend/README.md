1. Read source records in small batches
2. Transform them into the MongoDB document shape
3. Use bulkWrite instead of one write per request
4. Use upsert or idempotent filters to avoid duplicates
5. Limit batch size to avoid overwhelming the cluster
6. Track progress with logs/checkpoints
7. Monitor Atlas CPU, memory, disk I/O, connections, and slow queries
8. Pause or reduce batch size if Atlas alerts showed pressure
9. Adding index to improve performance, the query could use the compound index to filter and sort efficiently, instead of scanning many documents or doing an expensive in-memory sort. For Mongoose, I also used .lean() for read-only dashboard queries because it avoids creating full Mongoose document instances and reduces memory overhead.