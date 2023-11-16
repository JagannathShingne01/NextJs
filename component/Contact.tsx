import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';


interface ContactType {
    name: string;
    email: string;
    phone: string;
    message: string;
    service: any;
  }

export default function Contact(){
    const [contactData, setContactData] = useState<ContactType>({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  const form = useRef<null | HTMLFormElement>(null);
  function handleSubmit(e:any){
    e.preventDefault();
    if (typeof form !== null) {
        if (
          !contactData.name ||
          !contactData.email ||
          !contactData.phone ||
          !contactData.message ||
          !contactData.service
        ){
                toast.error("Please provide all the details!")
                return;
        }
        if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              contactData.email.toString()
            )
          ) {
            toast.error("Please provide a valid email id.");
            return;
          }
          try{
            fetch("/api/contact", {
                method: "POST",
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(contactData),
              });
            toast.success(
                "Your enquiry has been submitted successfully. We'll get back to you at our earliest.",
                { duration: 3000 }
            );
          }catch(e){
            toast.error("Something went Wrong. please try again later.")
          }
        }
        setContactData({
            name: "",
            email: "",
            phone: "",
            message: "",
            service: "",
        });
    }
    return(
        <div>
            <form>
                <div>
                    <label htmlFor="name">
                        Name*
                    </label>
                    <div>
                        <input type="text"
                                name='name'
                                value={contactData.name}
                                onChange={(e)=>setContactData((prev)=>({
                                    ...prev,
                                    name:e.target.value,
                                }))}
                                id='name'
                                autoComplete='family-name'
                                placeholder='Full Name'
                                className='border border-black ring-8'
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email">
                        Email*
                    </label>
                    <div>
                        <input type="email" 
                            name="email" 
                            id="email" 
                            value={contactData.email}
                            onChange={(e)=> setContactData((prev)=>({
                                ...prev,
                                email:e.target.value,
                            }))}
                            autoComplete='email'
                            placeholder='Enter Your Email'
                            />
                    </div>
                </div>
                <div>
                    <label htmlFor="phone">
                        phone number* 
                    </label>
                    <PhoneInput
                        onChange={(v,c,e, phone)=>{
                            setContactData({
                                ...contactData,
                                phone: phone,
                            });
                        }}
                        inputProps={{
                            name:"phone",
                        }}
                        value={contactData.phone}
                        country={"in"}
                        inputClass='!w-full py-6 !text-white'
                    />
                </div>
                <div>
                    <label htmlFor="service">
                        Reason for Contact*
                    </label>
                    <input type="text"
                            id='service'
                            name='service'
                            value={contactData.service}
                            onChange={(e)=>
                            setContactData((prev)=>({
                                ...prev,
                                service:e.target.value,
                            }))
                            }
                            required
                    />
                </div>
                <div>
                    <label htmlFor="message">
                        Message*
                    </label>
                    <div>
                        <textarea name="message"
                                id="message"
                                value={contactData.message}
                                onChange={(e)=>
                                    setContactData((prev)=>({
                                        ...prev,
                                        message: e.target.value,
                                    }))} 
                                aria-describedby="message-max"
                                autoComplete="radom text"
                                placeholder="Your Message"    
                                rows={3}/>
                    </div>
                </div>
                <div>
                    <button 
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    )

}