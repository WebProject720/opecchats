'use client'
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import React, { useEffect, useRef, useState } from "react"
import '../../../globals.css'
import { Header } from "../header/header"
import { state } from "@/store/poxy"
import axios from "axios"
import { io } from "socket.io-client"



function GroupChats({ chats, identifier }: any) {
    // const chats = [
    //     {
    //         msg: "HELLO, how are you?",
    //         sender: "Alice",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 15:35:58 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "I'm good, thanks! What about you?",
    //         sender: "Bob",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 15:40:10 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "I'm doing well too! I'm doing well too! I'm doing well too! I'm doing well too!",
    //         sender: "Charlie",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 15:45:22 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "What are your plans for today?",
    //         sender: "Diana",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 15:50:35 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Just working on a new project. You?",
    //         sender: "Alice",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 15:55:48 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Same here! What are you working on?",
    //         sender: "Bob",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 16:00:05 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "A new web app using Next.js.",
    //         sender: "Charlie",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 16:05:12 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Sounds interesting! Need any help?",
    //         sender: "Diana",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 16:10:29 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Thanks! I might need some feedback later.",
    //         sender: "Alice",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 16:15:36 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Sure, just let me know!",
    //         sender: "Bob",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 16:20:45 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "HELLO, how are you?",
    //         sender: "Alice",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 15:35:58 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "I'm good, thanks! What about you?",
    //         sender: "Bob",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 15:40:10 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "I'm doing well too!",
    //         sender: "Charlie",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 15:45:22 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "What are your plans for today?",
    //         sender: "Diana",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 15:50:35 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Just working on a new project. You?",
    //         sender: "Alice",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 15:55:48 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Same here! What are you working on?",
    //         sender: "Bob",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 16:00:05 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "A new web app using Next.js.",
    //         sender: "Charlie",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 16:05:12 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Sounds interesting! Need any help?",
    //         sender: "Diana",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 16:10:29 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Thanks! I might need some feedback later.",
    //         sender: "Alice",
    //         sendBy: true,
    //         date: "Tue Aug 13 2024 16:15:36 GMT+0530 (India Standard Time)"
    //     },
    //     {
    //         msg: "Sure, just let me know!",
    //         sender: "Bob",
    //         sendBy: false,
    //         date: "Tue Aug 13 2024 16:20:45 GMT+0530 (India Standard Time)"
    //     }
    // ]


    const socket=io();
    socket.on('chats',()=>{
        
    })

    if (chats?.length <= 0) chats = [];
    const [userID, setuserID] = useState(null);
    useEffect(() => {
        setuserID(state.loggedUser._id);
    }, []);

    const sendText = async (e: any) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const text = form.get('message') as string;
        if (text?.length <= 0)
            return
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/chat/write`, {
                identifier: identifier,
                msg: text
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',  // Ensure the content type is correct
                }
            })
        } catch ({ response }: any) {
            console.log(response?.data?.message || "Error");
        }
        e.target.reset();
    }


    let scrollDiv: any = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (scrollDiv.current)
            scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
    }, [])
    return (
        <div className="h-full flex flex-col ">
            <div className='h-16'>
                <Header name={identifier} />
            </div>
            <div className="h-full flex flex-col p-2">
                <div
                    ref={scrollDiv} id="scrollDiv" className="fields flex flex-col  flex-grow h-[50vh]
                 hiddren-scroll overflow-y-auto bg-[#052043]
                 transition-all duration-1000 ease-linear
                 ">
                    {
                        chats &&
                            chats?.length <= 0 ?
                            <div>
                                <h1 className="text-3xl h-full opacity-35 font-extrabold align-middle">
                                    <center>
                                        Not Chats Till Now
                                    </center>
                                </h1>
                            </div> :
                            chats.map((e: any, i: number) => (
                                <div key={i} className={`w-full my-2
                            flex message
                            ${e.senderID == userID ? `justify-end ` : `justify-start`}
                        `}>
                                    <div className={`p-3 rounded-full bg-white
                         text-white bg-opacity-25 w-fit my-1 max-w-[60%]
                         ${e.senderID == userID ? 'bg-white ' : 'bg-blue-500 bg-opacity-50'}`}>
                                        <div>
                                            {e.msg}
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="text-xs h-full flex items-end text-opacity-50 text-white">
                                            {
                                                new Date(e.updatedAt).toLocaleTimeString('en-US', { hour12: true, minute: '2-digit', hour: 'numeric' })
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className="input bg-[#052043]">
                    <form onSubmit={sendText} action="" className="flex w-full flex-row gap-2 py-1">
                        <Input name="message" className="w-full flex-grow" placeholder="Message"></Input>
                        <Button className="!w-28" type='submit' text='Send'></Button>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default GroupChats;