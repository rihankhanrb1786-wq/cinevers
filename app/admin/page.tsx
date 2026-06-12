"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
const [message, setMessage] = useState("");
const [videoFile, setVideoFile] = useState<File | null>(null);

async function submit(e: React.FormEvent) {
e.preventDefault();

```
const supabase = createClient();

if (!supabase) {
  setMessage("Supabase not connected");
  return;
}

if (!videoFile) {
  setMessage("Please select a video");
  return;
}

setMessage("Uploading...");

const fileName = `${Date.now()}-${videoFile.name}`;

const { error } = await supabase.storage
  .from("Movies")
  .upload(fileName, videoFile);

if (error) {
  setMessage(error.message);
  return;
}

setMessage("✅ Video uploaded successfully!");
```

}

return (
<div style={{ padding: "30px", color: "white", background: "black", minHeight: "100vh" }}> <h1>CINEVERS ADMIN</h1>

```
  <form onSubmit={submit}>
    <input
      type="file"
      accept="video/*"
      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
    />

    <br />
    <br />

    <button type="submit">
      Upload Video
    </button>
  </form>

  <p>{message}</p>
</div>
```

);
}
