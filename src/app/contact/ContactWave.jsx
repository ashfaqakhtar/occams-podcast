"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

const MAIL_ENDPOINT = process.env.NEXT_PUBLIC_MAIL_ENDPOINT || "/mail/endpoint.php";

function VoiceBar({ height, backgroundColor, className = "", speed = 500 }) {
    const scale = useMotionValue(1);

    useEffect(() => {
        const loop = setInterval(() => {
            animate(scale, 0.75 + Math.random() * 0.55, {
                duration: 0.6, ease: "easeInOut",
            });
        }, speed);

        return () => clearInterval(loop);
    }, [scale, speed]);

    return (
        <motion.div className={`lg:w-12.75 md:w-11 rounded-full ${className}`} style={{
            height: height, backgroundColor: backgroundColor,
            scaleY: scale, transformOrigin: "center",
        }} />
    );
}

function VoiceBarHorizontal({ width, backgroundColor, speed = 500, className = "" }) {
    const scale = useMotionValue(1);

    useEffect(() => {
        const loop = setInterval(() => {
            animate(scale, 0.75 + Math.random() * 0.55, { duration: 0.6, ease: "easeInOut" });
        }, speed);
        return () => clearInterval(loop);
    }, [scale, speed]);

    return (
        <motion.div className={`h-10 rounded-full shrink-0 ${className}`} style={{
            width: width, backgroundColor,
            scaleX: scale, transformOrigin: "center",
        }} />
    );
}

const ContactWave = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = {
            form: "contact",
            first_name: (formData.get("first_name") || "").toString().trim(),
            email: (formData.get("email") || "").toString().trim(),
            subject: (formData.get("subject") || "").toString().trim(),
            message: (formData.get("message") || "").toString().trim(),
        };

        if (!payload.first_name || !payload.email || !payload.subject || !payload.message) {
            Swal.fire({
                icon: "error",
                title: "Missing fields",
                text: "All fields are required.",
                confirmButtonColor: "#F36B21",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(MAIL_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get("content-type") || "";
            let data;

            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const raw = await response.text();
                throw new Error(
                    raw.includes("<!DOCTYPE") || raw.includes("<html")
                        ? "Mail endpoint returned HTML. Check NEXT_PUBLIC_MAIL_ENDPOINT and PHP server."
                        : (raw || "Unexpected non-JSON response from mail endpoint.")
                );
            }

            if (!response.ok || !data.success) {
                throw new Error(data?.message || "Failed to send message.");
            }

            form.reset();
            Swal.fire({
                icon: "success",
                title: "Sent",
                text: data.message || "Message sent successfully.",
                confirmButtonColor: "#F36B21",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submit failed",
                text: error.message || "Something went wrong.",
                confirmButtonColor: "#F36B21",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Fragment>
            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <h4 className="heading-4 text-white text-center">
                        Speak to us
                    </h4>
                </div>
            </section>

            <section className="w-full flex justify-center items-center relative sm:px-10 px-5">
                <div className='container mx-auto hidden lg:flex items-center justify-center gap-9'>
                    <VoiceBar height={180} backgroundColor="#EA834C" />
                    <VoiceBar height={380} backgroundColor="#EA834C" />
                    <VoiceBar height={290} backgroundColor="#F36B21" />

                    <form onSubmit={handleContactSubmit} className="w-172 flex flex-col justify-evenly bg-[#341606] p-8 rounded-2xl">
                        <h5 className="heading-5 text-white">
                            Send a Message
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            <div>
                                <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                    Name <span className="text-red-600">*</span>
                                </label>

                                <input name="first_name" placeholder="Your Name" required className={`w-full h-12 body-3 
                                    rounded-xl border text-[#FFFFFF5E] outline-none border-[#FFFFFF5E] px-4 focus:ring-3
                                    transition-all duration-200 focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10`}
                                />
                            </div>

                            <div>
                                <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                    Email <span className="text-red-600">*</span>
                                </label>

                                <input name="email" type="email" placeholder="Your Email ID" required className={`w-full h-12
                                    rounded-xl border text-[#FFFFFF5E] outline-none border-[#FFFFFF5E] px-4 focus:ring-3
                                    transition-all duration-200 focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10 body-3`}
                                />
                            </div>

                            <div>
                                <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                    Subject <span className="text-red-600">*</span>
                                </label>

                                <input name="subject" placeholder="What’s this about " required className={`w-full h-12
                                    rounded-xl border text-[#FFFFFF5E] outline-none border-[#FFFFFF5E] px-4 focus:ring-3
                                    transition-all duration-200 focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10 body-3`}
                                />
                            </div>
                        </div>

                        <div className="md:mt-5 mt-4">
                            <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                Your Message
                            </label>

                            <textarea required name="message" placeholder="Your Message" className={`w-full min-h-28 
                                body-3 rounded-xl px-4 py-3 text-[#FFFFFF5E] outline-none border border-[#FFFFFF5E]
                                focus:ring-3 transition-all focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10
                                duration-200`}></textarea>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <button type="submit" disabled={isSubmitting} className={`inline-flex flex-nowrap items-center gap-3 rounded-full cursor-pointer 
                                cta-1 justify-center whitespace-nowrap bg-white text-[#F36B21] py-2 pl-5 pr-2.5 disabled:opacity-60`}
                            >
                                <span className="whitespace-nowrap">{isSubmitting ? "Sending..." : "Send Message"}</span>
                                <img src='/logo/email-contact.png' alt="Button" className="h-auto w-max shrink-0" />
                            </button>
                        </div>
                    </form>

                    <VoiceBar height={290} backgroundColor="#EA834C" />
                    <VoiceBar height={380} backgroundColor="#F36B21" />
                    <VoiceBar height={290} backgroundColor="#E9A986" />
                    <VoiceBar height={180} backgroundColor="#EA834C" />
                </div>

                <div className="w-full container mx-auto lg:hidden flex flex-col items-center justify-center gap-7">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <VoiceBarHorizontal width={170} backgroundColor="#EA834C" />
                        <VoiceBarHorizontal width={210} backgroundColor="#F36B21" />
                        <VoiceBarHorizontal width={260} backgroundColor="#E9A986" />
                    </div>

                    <form onSubmit={handleContactSubmit} className="w-full flex flex-col justify-evenly bg-[#341606] p-5 rounded-2xl">
                        <h5 className="heading-5 text-white">
                            Send a Message
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            <div>
                                <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                    Name <span className="text-red-600">*</span>
                                </label>

                                <input name="first_name" placeholder="Your Name" required className={`w-full h-12 body-3 
                                    rounded-xl border text-[#FFFFFF5E] outline-none border-[#FFFFFF5E] px-4 focus:ring-3
                                    transition-all duration-200 focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10`}
                                />
                            </div>

                            <div>
                                <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                    Email <span className="text-red-600">*</span>
                                </label>

                                <input name="email" type="email" placeholder="Your Email ID" required className={`w-full h-12
                                    rounded-xl border text-[#FFFFFF5E] outline-none border-[#FFFFFF5E] px-4 focus:ring-3
                                    transition-all duration-200 focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10 body-3`}
                                />
                            </div>

                            <div>
                                <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                    Subject <span className="text-red-600">*</span>
                                </label>

                                <input name="subject" placeholder="What’s this about " required className={`w-full h-12
                                    rounded-xl border text-[#FFFFFF5E] outline-none border-[#FFFFFF5E] px-4 focus:ring-3
                                    transition-all duration-200 focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10 body-3`}
                                />
                            </div>
                        </div>

                        <div className="md:mt-5 mt-4">
                            <label className="block body-3 text-[#FFFFFF5E] mb-1.5">
                                Your Message
                            </label>

                            <textarea required name="message" placeholder="Your Message" className={`w-full min-h-28 
                                body-3 rounded-xl px-4 py-3 text-[#FFFFFF5E] outline-none border border-[#FFFFFF5E]
                                focus:ring-3 transition-all focus:border-[#FFFFFF5E] focus:ring-[#FFFFFF]/10
                                duration-200`}></textarea>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <button type="submit" disabled={isSubmitting} className={`inline-flex flex-nowrap items-center gap-3 rounded-full cursor-pointer
                                cta-1 justify-center whitespace-nowrap bg-white text-[#F36B21] py-2 pl-5 pr-2.5 disabled:opacity-60`}
                            >
                                <span className="whitespace-nowrap">{isSubmitting ? "Sending..." : "Send Message"}</span>
                                <img src='/logo/email-contact.png' alt="Button" className="h-auto w-max shrink-0" />
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-col items-center justify-center gap-5">
                        <VoiceBarHorizontal width={260} backgroundColor="#EA834C" />
                        <VoiceBarHorizontal width={210} backgroundColor="#F36B21" />
                        <VoiceBarHorizontal width={170} backgroundColor="#E9A986" />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ContactWave
