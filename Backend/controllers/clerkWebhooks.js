import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const event = webhook.verify(payload, headers);

    const { data, type } = event;

    if (!data) {
      return res.status(400).json({ success: false });
    }

    const userData = {
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    if (type === "user.created") {
      await User.create(userData);
    }

    if (type === "user.updated") {
      await User.findOneAndUpdate({ clerkId: data.id }, userData, {
        new: true,
      });
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkId: data.id });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
