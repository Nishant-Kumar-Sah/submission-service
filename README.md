# Submission Service

The Submission Service is a core component of the Remote Code Executor system. It handles user code submissions, interacts with other services to prepare and dispatch jobs for execution, and sends the result to socket-service which displays the result on frontend.

---

## 📌 Responsibilities

- Accept submission requests from frontend clients.
- Fetch problem details from the Problem Admin Service.
- Compose final executable code using user code and code stubs.
- Persist submission metadata in MongoDB.
- Push submission jobs to a Redis-backed Submission Queue.
- Receive execution results from the Evaluation Queue.
- Update submission status and forward the result to the Socket Service for real-time updates.

---

## ⚙️ Tech Stack

- **Framework**: Fastify
- **Database**: MongoDB
- **Queue System**: Redis
- **Inter-Service Communication**: REST APIs

---

## 📥 Submission Flow

1. **User Submission**
   - Endpoint: `POST /api/v1/submission`
   - Payload: `{ userId, problemId, code, language }`

2. **Fetch Problem Metadata**
   - Calls Problem Admin Service: `GET /api/v1/problem/:id`
   - Receives test cases and language-specific code stubs.

3. **Compose Executable Code**
   - Combine: Start stub + User code + End stub.

4. **Persist Submission**
   - Save initial submission state to MongoDB with `status: PENDING`.

5. **Enqueue for Evaluation**
   - Format job with required fields.
   - Push to **Submission Queue** (Redis).

6. **Evaluation and Result Retrieval**
   - Evaluation Service picks jobs, evaluates the code, and sends results to **Evaluation Queue**.

7. **Result Processing**
   - Worker consumes messages from the Evaluation Queue.
   - Updates MongoDB with execution result and final status (`SUCCESS`, `WA`, `TLE`, `ERROR`, etc).

8. **Real-Time Update**
   - Forwards result payload to Socket Service (`/sendPayload`), which notifies the frontend via WebSocket.

---

## ✨ Running Locally

### 🧱  Prerequisites

- Node.js (v16+)

- Redis Connection

### 📦 Installation
1. Clone the Repository
   ```
   git clone <repo-url>
   cd submission-service
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Setup .env file
4. Run the Service
    ```
    npm start  
    ```
5. Verify the service
     ```
     http://localhost:3001/ping
---




