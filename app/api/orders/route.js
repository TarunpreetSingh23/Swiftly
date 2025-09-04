import { connects } from "@/dbconfig/dbconfig";
import Task from "@/models/task";

export async function POST(req) {
  try {
    await connects();

    const {
      customerName,
      email,         // ✅ added email
      phone,
      address,
      pincode,
      cart,
      subtotal,
      discount,
      total,
      date,
      timeSlot,
      paymentMethod,
    } = await req.json();
   
    // ✅ validate required fields
    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !date ||
      !timeSlot ||
      !cart?.length
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // ✅ create new task
    const task = await Task.create({
      customerName,
      email,       // ✅ save email in DB
      phone,
      address,
      pincode,
      cart,
      subtotal,
      discount,
      total,
      date,
      timeSlot,
      paymentMethod: paymentMethod || "Pay After Service",
    });
    console.log(task)

    return new Response(
      JSON.stringify({ success: true, orderId: task.order_id }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
