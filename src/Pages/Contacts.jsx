import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContextApi } from "../Providers/ContextProvider";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { SectionHead } from "../Components/SectionHead";
import { Typewriter } from "react-simple-typewriter";
import { Element } from "react-scroll";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

export const Contacts = () => {
  const { loading, setLoading } = useContext(ContextApi);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formInfo) => {
    setLoading(true);

    const templateParams = {
      name: formInfo.name,
      email: formInfo.email,
      number: formInfo.number,
      message: formInfo.message,
    };
    // console.log(templateParams);

    emailjs
      .send(
        import.meta.env.VITE_EmailJS_Service_ID, // Replace with your EmailJS service ID
        import.meta.env.VITE_EmailJS_Template_ID, // Replace with your EmailJS template ID
        templateParams,
        import.meta.env.VITE_EmailJS_User_ID // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Email sent successfully!");
          reset();
          setLoading(false);
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send email. Please try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <Element name="contact" className="py-8">
      <div>
        <SectionHead
          title={"Get In Touch"}
          para={"Please Let Me Know If You Have Any Queries"}
        />
      </div>

      <div className="contacts">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto md:mt-10 flex flex-col gap-5 w-full lg:w-8/12"
        >
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 text-black bg-transparent border border-third shadow-md shadow-accent hover:shadow-primary"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-black w-full p-3 rounded-lg"
              type="text"
              name="name"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </label>
          {errors.name && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 text-black bg-transparent  border border-third shadow-md shadow-accent hover:shadow-primary"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-black w-full p-3 rounded-lg"
              type="email"
              name="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <label
            data-aos="flip-up"
            data-aos-duration="1000"
            className="input input-bordered flex items-center gap-2 text-black bg-transparent border border-third shadow-md shadow-accent hover:shadow-primary"
          >
            <MdDriveFileRenameOutline />
            <input
              className="text-black w-full p-3 rounded-lg"
              type="number"
              name="number"
              placeholder="Your Mobile Number"
              {...register("number", { required: true })}
            />
          </label>
          {errors.number && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <div className="text-black">
            <Typewriter
              words={["Write Your Message Here..."]}
              loop={5}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <textarea
            data-aos="flip-up"
            data-aos-duration="1000"
            onSelect={blur}
            className="h-52 bg-transparent border border-third text-black font-bold p-5 text-xl rounded-lg shadow-md shadow-accent hover:shadow-primary"
            name="message"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-600 text-xs">This field is required</span>
          )}
          <button
            className="hover:bg-primary text-black md:text-lg text-base hover:text-accent w-6/12 mx-auto px-3 py-1 rounded-xl bg-transparent border border-accent duration-500 shadow-sm shadow-primary hover:shadow-primary"
            type="submit"
          >
            {loading ? <LoadingSpinner /> : "Email"}
          </button>
        </form>
      </div>
    </Element>
  );
};
