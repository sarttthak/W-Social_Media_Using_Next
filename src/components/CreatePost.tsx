"use client"

import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ImageIcon, Loader2Icon, SendIcon } from 'lucide-react';
import { createPost } from '@/actions/post.action';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';
import { url } from 'inspector';

function CreatePost() {
    const {user}=useUser();
    const [content, setContent] = useState("");
    const[imageUrl, setImageUrl] = useState("");
    const [isPosting, setIsPosting] = useState(false);  
    const [showImageUpload,setShowImageUpload] = useState(false);

    const handleSubmit =async()=>{

        if(!content.trim() && !imageUrl) return;

        setIsPosting(true);

        try {
           const result= await createPost(content, imageUrl);
           if(result?.success){
            setContent("");
            setImageUrl("");
            setShowImageUpload(false);

            toast.success("Post created successfully!");

           }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post. Please try again.");
            
        }
        finally{
            setIsPosting(false);

        }
    }
  return (
    <Card className='mb-6'>
        <CardContent className='pt-0'>
            <div className="space-y-4">
                <div className="flex space-x-4">
                    
                    <Textarea 
                    placeholder='What is on your mind?'
                    className='min-h-[100px] resize-none border-none focus:ring-0 focus-visible:ring-0 p-4 text-base'
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    disabled={isPosting}
                    />
                </div>

                {(showImageUpload || imageUrl) && (
                  <div className="border rounded-lg p-4">
                    <ImageUpload
                    
                      endpoint="postImage"
                      value={imageUrl}
                      onChange={(url) => {
                        setImageUrl(url);
                        if (!url) setShowImageUpload(false);
                      }}
                      
                    />
                  </div>
                )}

                 <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-5" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4  animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 " />
                  Post
                </>
              )}
            </Button>
          </div>


            </div>

        </CardContent>

    </Card>
  )
}

export default CreatePost