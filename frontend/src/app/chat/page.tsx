"use client";

import ArrowBackButton from "app/components/button/ArrowBackButton";
import { PenjualData, PembeliData } from "app/interfaces/Item/types";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface MessageCreateRequest {
  senderId?: string;
  recipientId?: string;
  content: string;
  timestamp?: Date;
  token: string;
}

interface ChatMessage {
  id?: string;
  chatGroup?: {
    id: string;
  };
  senderId: string;
  senderType: "PEMBELI" | "PENJUAL";
  content: string;
  timestamp?: Date;
  type?: "CHAT" | "JOIN" | "LEAVE";
}

const Chat = () => {
  const { data: session } = useSession();
  const [penjualList, setPenjualList] = useState<PenjualData[]>([]);
  const [pembeliList, setPembeliList] = useState<PembeliData[]>([]); // New state for PembeliData
  const [selectedChat, setSelectedChat] = useState<{ id: string; nama: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const stompClientRef = useRef<Client | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Fetch chat groups based on userType
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASEURL}/api/chat/groups`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });

        // Conditional logic for userType
        if (session?.user.userType === "PENJUAL") {
          const filteredPembeli = response.data.data.map((item: any) => ({
            id: item.id,
            ...item.pembeliDto,
          }));
          setPembeliList(filteredPembeli);
        } else {
          const filteredPenjual = response.data.data.map((item: any) => ({
            id: item.id,
            ...item.penjualDto,
          }));
          setPenjualList(filteredPenjual);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Error fetching chat groups:", error);
        }
      }
    };

    if (session?.accessToken) fetchData();
  }, [session?.accessToken, session?.user?.userType]);

  // WebSocket Connection
  useEffect(() => {
    if (stompClientRef.current) stompClientRef.current.deactivate();
    if (!selectedChat || !session?.accessToken) return;

    const stompClient = new Client({
      brokerURL: `ws://localhost:8000/api/ws`,
      webSocketFactory: () => new SockJS("http://localhost:8000/api/ws"),
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe(`/topic/chat/${selectedChat.id}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        fetchChatMessages();
      },
      onStompError: (error) => console.error("STOMP error:", error),
      onWebSocketError: (error) => console.error("WebSocket error:", error),
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_BASEURL}/api/chat/messages/${selectedChat.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setChatMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    return () => stompClient.deactivate();
  }, [selectedChat, session?.accessToken]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = useCallback(() => {
    if (!messageInput.trim() || !stompClientRef.current || !selectedChat || !session?.user) {
      console.error("Missing required data for sending the message");
      return;
    }

    const messagePayload: MessageCreateRequest = {
      senderId: session.user.id,
      recipientId: selectedChat.id,
      content: messageInput.trim(),
      timestamp: new Date(),
      token: session.accessToken || "",
    };

    if (stompClientRef.current.connected) {
      try {
        stompClientRef.current.publish({
          destination: `/app/chat/${selectedChat.id}/send-message`,
          body: JSON.stringify(messagePayload),
        });
        setMessageInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("STOMP client is not connected");
    }
  }, [messageInput, selectedChat, session?.accessToken, session?.user]);

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg border overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 border-b bg-gray-100">
          <ArrowBackButton url="/dashboard" size={24} hexColor="#1f2937" />
          <h1 className="text-2xl font-semibold text-gray-800 ml-3">Chat</h1>
        </div>

        {/* Main Content */}
        <div className="flex h-[720px]">
          {/* Chat List */}
          <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
            {session?.user.userType === "PENJUAL"
              ? pembeliList.map((pembeli) => (
                  <div
                    key={pembeli.id}
                    className={`flex items-center gap-3 p-4 border-b cursor-pointer transition ${
                      selectedChat?.id === pembeli.id ? "bg-blue-100" : "hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedChat({ id: pembeli.id, nama: pembeli.nama })}
                  >
                    <Image
                      src="/default_profile.png"
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="text-gray-800 font-medium">{pembeli.nama}</div>
                  </div>
                ))
              : penjualList.map((penjual) => (
                  <div
                    key={penjual.id}
                    className={`flex items-center gap-3 p-4 border-b cursor-pointer transition ${
                      selectedChat?.id === penjual.id ? "bg-blue-100" : "hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedChat({ id: penjual.id, nama: penjual.nama })}
                  >
                    <Image
                      src="/default_profile.png"
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="text-gray-800 font-medium">{penjual.nama}</div>
                  </div>
                ))}
          </div>

          {/* Chat Section */}
          <div className="w-2/3 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-gray-50 flex items-center gap-4">
                  <Image
                    src="/default_profile.png"
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="text-lg font-semibold text-gray-800">{selectedChat.nama}</div>
                </div>

                {/* Chat Messages */}
                <div ref={chatMessagesRef} className="flex-grow overflow-y-auto p-6 bg-gray-50 space-y-4">
                  {chatMessages.map((message, index) => {
                    const isUserMessage = message.senderId === session?.user?.id;
                    return (
                      <div
                        key={index}
                        className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
                            isUserMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-gray-100 flex items-center gap-3 border-t">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500 text-lg">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
