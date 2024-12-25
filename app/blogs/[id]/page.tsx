"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../Components/Footer"; 
import { FaArrowRight, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useParams } from "next/navigation"; 

const blog_data = [
  {
    id: 1,
    title: "Bond Beyond Words My Dog Story",
    author: "Aqsa Shah",
    author_img: "/assets/author.jpeg",
    image: "/assets/dog.jpeg",
    description: " About ten years ago, when I was just a little girl, we lived in a small village not too far from the city. One cold December night, a trained pet dog showed up at our doorstep. We had no idea whose pet it was, but he seemed calm and well-behaved. My father decided to take care of him for the time being, thinking he might eventually return to his owner. But he never left. He became a part of our family, though not everyone was thrilled about it. My mother, for instance, did not like him much, but my father, brother, and I adored him. Gradually, he became attached to us, and we could not imagine life without him. This dog, who we never formally named, had his quirks. He was fiercely loyal and would follow us everywhere. My father would often tell him, Do not follow me, go back home, but he would not listen. He would reluctantly turn back midway or, on rare occasions, stubbornly tag along until my father returned. He was protective, especially with strangers. If someone unfamiliar approached our home, he would bark until we reassured him they were not a threat. Despite his tough exterior, he was incredibly gentle with us. No matter what we did—playing around or even scolding him—he never got upset. However, not everyone shared our love for him. Some neighbors and relatives complained, saying things like, Dogs drive away blessings. Their comments hurt us, but we ignored them because he had become family. I remember how excited he would get when I came home after being away for a while. He would run towards me, leaping with joy, circling around and wagging his tail as if he had waited forever. We would play together—me running, and him chasing. One day, he scared my aunt by barking at her while she walked by. She was terrified and often complained about him. Then, the unimaginable happened. Some boys cruelly beat him, leaving him severely injured. He was in terrible condition—his eyes swollen shut and his body bruised. We took him to the vet, but I feared we would lose him. Surprisingly, he survived. It felt like a miracle. Those who disliked him were disappointed, but for us, it was a second chance to cherish him. He recovered fully, as lively and loyal as ever. When my father passed away, our dog seemed to grieve with us. He became quieter, often looking sad and lost. It was heartbreaking to see, but we showered him with love and care. Over time, I brought more pets into our home—cats and other dogs. At first, he was jealous, growling and barking at them. But with patience, I helped him adjust, and he eventually became their protector too. He guarded our house fiercely, never letting strangers or even thieves near our home. The entire village felt safer because of him. One time, I was away from home for three months. When I returned, he was not his usual self. He was sick, lying quietly in a corner. We called the vet, but his condition worsened. He stopped eating and grew weaker with each passing day. And then, one day, he disappeared. I searched everywhere, prayed for his safety, and cried endlessly. Two days later, on a November morning in 2024, we found out he had passed away near my aunts house. The smell gave him away. I could not bear to see him in that state, so I did not. But the pain of losing him stayed with me. I cried for days, my heart heavy with the memories of his loyalty, love, and companionship. Even now, whenever I see a dog, I think of him. Losing a beloved pet is like losing a piece of your soul. The love they give is unmatched, and their absence leaves a void that nothing can fill."

  },

  {
    id: 2,
    title: "My Beloved Companion: A Heartfelt Journey of Love and Loss",
    author: "Aqsa Shah",
    author_img: "/assets/author.jpeg",
    image: "/assets/cat.jpeg",
    description: "Five years ago, a special companion entered my life- my beloved cat. He was initially someone else's pet, but fate brought him to me, and he quickly became an irreplaceable part of my world. From the very first day, his innocent face and gentle presence brought joy and peace into my life. I have always believed that having a pet is an essential part of life. A pet isn't just an animal; they are a friend, a confidant who stands by you without asking for anything in return. My cat was exactly that for me- a true friend in every sense. His love was unconditional and pure. Whenever I was sad, he would quietly come and sit by my side as if to say, I am here for you. There were times when I couldn't hold back my tears, and it felt as if he could sense my pain. He would stay close, offering silent comfort that no words could ever match. For five wonderful years, he was by my side. He became a part of my daily life- listening to my thoughts, sharing my moments of joy, and being my source of calm during tough times. I often talked to him about things I couldn't share with anyone else, and his presence alone made everything feel a little lighter. But life is unpredictable, and one day, he was no longer with me. The pain of losing him was unbearable; I cried for days, missing his comforting presence, his warm gaze, and the way he made my home feel alive. Even now, thinking about him brings a mix of sadness and gratitude. Having a pet is truly a blessing. They teach you the value of love, loyalty, and companionship. My cat may no longer be with me, but he left behind memories that I will cherish forever. To anyone who has the chance to care for a pet, I can only say this- cherish them, love them, and let them be a part of your life. Because their love is one of the purest forms of love you will ever experience. I miss him deeply, but I am forever grateful for the beautiful bond we shared. My home may feel emptier now, but my heart is full of the love and joy he gave me during his time here. To my beloved companion: Thank you for being my friend, my comfort, and my family. You will always hold a special place in my heart."
  },
  
  {
    id: 3,
    title: "The Living Connection: My Bond with Plants",
    author: "Aqsa Shah",
    author_img: "/assets/author.jpeg",
    image: "/assets/plant.jpeg",
    description: "Plants much like humans are living beings. They breathe grow and thrive when cared for creating an unspoken connection with those who nurture them. This connection is something I have experienced deeply in my life. Over the years I have surrounded myself with plants bringing vibrant life into my home. Caring for them became more than just a routine; it was a labor of love. I watered them ensured they had just the right amount of sunlight and protected them from harsh weather or wandering animals. They were like family to me and I treated them with the same care and affection one would give to a loved one. This attachment grew stronger with time. Watching them grow and flourish brought immense joy and peace. However when a plant withered or died despite my efforts it was a source of great sadness. It felt like losing a part of my world a silent companion that had been there through my days. Caring for plants is not just a hobby it is a way to stay connected with nature and remain grounded. It brings a sense of purpose and keeps you busy in the best way possible. Watching new leaves sprout or flowers bloom is a rewarding experience that fills your heart with pride and contentment. Through this journey I have realized that plants teach us patience care and the importance of nurturing life. They remind us of the beauty of growth and the inevitability of change. Having plants around is more than an aesthetic choice it is a commitment to preserving and celebrating life. For me this bond with plants is irreplaceable. They may not speak but their presence speaks volumes. They are a reminder of the interconnectedness of all living things and the joy that comes from taking care of something beyond yourself."
  },

  {
    id: 4,
    title: "The Silent Healers: How Plants Transform Our Lives",
    author: "Aqsa Shah",
    author_img: "/assets/author.jpeg",
    image: "/assets/plant1.jpg",
    description: "Plants are not just decorative additions to our homes or gardens; they are silent healers that enrich our lives in countless ways. Beyond their beauty, they offer physical, emotional, and spiritual benefits that often go unnoticed but have a profound impact on our well-being. Having plants around creates a peaceful and calming environment. Their greenery soothes the mind and reduces stress, bringing a sense of serenity into our hectic lives. Studies have shown that spending time with plants or even just being in their presence can lower blood pressure and enhance mood. They silently purify the air we breathe, filtering out toxins and providing fresh oxygen, making our living spaces healthier. My journey with plants began as a simple effort to add beauty to my surroundings, but it quickly grew into a meaningful relationship. Each plant became a unique entity, each with its own requirements and personality. Some thrived in sunlight, while others flourished in the shade. Learning their needs and watching them grow taught me patience and mindfulness. Plants also have an incredible way of grounding us. Caring for them requires us to pause and be present in the moment—whether it is watering, trimming, or repotting. These small acts of care become meditative rituals, offering a break from the chaos of everyday life. What I find most fascinating about plants is their resilience. Even when they seem lifeless, a little care and attention can revive them. This resilience is a powerful reminder for us to persevere during tough times. Plants show us that with nurture and patience, growth is always possible. Having plants is not just about personal satisfaction. They also symbolize the importance of giving back to the planet. By planting trees and greenery, we contribute to a better environment for ourselves and future generations. In a world that often feels overwhelming, plants provide a gentle reminder of life’s simplicity and beauty. They are more than just a hobby; they are companions that inspire us to live harmoniously with nature. The bond we form with them, though silent, is filled with life and meaning. For anyone looking to enhance their life, start with a plant. Let it teach you the value of patience, care, and the beauty of growth. In their quiet way, plants have the power to transform not just our surroundings, but also our hearts."
},

{
  id: 5,
  title: "Exploring Sindh: A Journey Close to My Heart",
  author: "Aqsa Shah",
  author_img: "/assets/author.jpeg",
  image: "/assets/travelblog1.jpeg",
  description: "I reside in a small town called Naushahro Feroze, situated in the heart of Sindh, Pakistan. Though Ive never traveled beyond Sindh, it holds a special place in my heart—it's my paradise. When I think of traveling elsewhere, my heart always drifts back to Sindh. Over the years, I’ve visited numerous cities across this beautiful province, each offering unique experiences and memories. In this blog, I want to share some of my fondest travel moments within Sindh, showcasing the charm of this region that feels like home to me. 1. Karachi – The City of Lights and Culture: Karachi, the bustling metropolis of Sindh, was my first glimpse of the big city life. The first time I visited Karachi, it felt like the city would never end. The city’s energy, the busy streets, the vibrant markets, and the nightlife were so different from the calm of my hometown. The evenings by the Karachi Marina and Clifton Beach were incredibly peaceful. Karachi is a blend of cultures and traditions, and I couldn't help but marvel at its diverse lifestyle. The food streets, where you can find anything from street food to fine dining, were an absolute delight. Karachi’s vibrant atmosphere and the hospitality of its people made it one of my favorite destinations. 2. Hyderabad – The City of Sufi Saints: Next up, Hyderabad, the city with a rich history and spiritual aura. Hyderabad felt like a time machine, taking me back to the medieval days with its old streets and historical architecture. One of the highlights of my visit was the shrine of Shahbaz Qalandar, where the peaceful energy of the Sufi saints enveloped me. The historical significance of Hyderabad, combined with its rich culture, left a lasting impression on me. The local cuisine, especially the famous Sindhi Biryani, was a treat, and I remember how it filled my heart with warmth and joy. 3. Larkana – A Journey Through History: Larkana holds an important place in my travels because of its historical significance. The ancient ruins of Mohenjo-Daro were awe-inspiring and left me with a deep sense of connection to the past. Walking through these ruins, I imagined the life of the people who once lived there. Larkana’s serene atmosphere and the simplicity of its people made it one of the most peaceful places I’ve visited. The local food, especially the traditional Sindhi dishes, was a delightful addition to the experience. 4. Kandiaro – A Blend of Tradition and Tranquility: Kandiaro may be a small town, but it holds its own charm. The lush green fields, the rural simplicity, and the peaceful surroundings made it an ideal escape from the noise of city life. Exploring the traditional Sindhi culture, from the colorful dresses to the local customs, gave me a deeper appreciation for the people of Sindh. The rural life in Kandiaro was calm and refreshing, allowing me to truly relax and connect with nature. 5. Nawabshah – A City Full of Character: Nawabshah is a city that perfectly blends historical significance and local charm. The bazaars, the old forts, and the traditional markets added to the charm of the place. The hospitality of the locals was heartwarming, and the food was simply delicious. I remember indulging in the spicy Sindhi Karhi and Biryani, both of which were absolutely mouthwatering. Nawabshah, with its old-world charm and modern vibrancy, was a truly delightful destination. 6. Khairpur – A Gateway to Sindh's Heritage: Khairpur was another gem in Sindh that I explored. The city’s rich cultural heritage and the warm hospitality of the locals made it an unforgettable experience. Visiting the historical landmarks, including the famous Faiz Mahal, was like stepping into the pages of history. The people of Khairpur are known for their kindness and the city’s peaceful environment made it a perfect place for reflection. 7. Sukkur – A Riverside Haven: Sukkur, with its picturesque landscapes and the mighty Indus River, offered a different vibe. The Sukkur Barrage, the old temples, and the breathtaking views of the river made this city special. Taking a boat ride on the Indus was an experience I’ll never forget. Sukkur has a unique charm, blending history, nature, and culture seamlessly. The city is a perfect example of how Sindh can surprise you with its beauty. 8. Keenjhar Lake – A Hidden Paradise: Finally, my visit to Keenjhar Lake was one of the most peaceful experiences. The lake, surrounded by nature, provided a perfect escape from the hustle and bustle of everyday life. The peaceful environment, the fresh air, and the beautiful surroundings made Keenjhar Lake a hidden gem in Sindh. Spending a day there, taking in the tranquility, and enjoying a boat ride on the lake was a serene experience that I'll always cherish. Conclusion: My travels within Sindh have been nothing short of magical. From the bustling streets of Karachi to the serene landscapes of Keenjhar Lake, each city has its own story and charm. Sindh, with its rich history, diverse culture, and warm-hearted people, will always remain close to my heart. For anyone who has yet to explore this part of Pakistan, I highly recommend it. Sindh, for me, is not just a place—it’s a home, a paradise that I hold dear to my soul."

},

{
  id: 6,
  title: "The Joys of Traveling and Meeting New People",
  author: "Aqsa Shah",
  author_img: "/assets/author.jpeg",
  image: "/assets/travel.jpeg",
  description: "Traveling is an adventure that opens up the world in ways we never imagined. It's not just about visiting new places, but about the experiences, the people, and the stories that we collect along the way. As a traveler, I've always been drawn to the idea of exploring new destinations and discovering different cultures. Meeting people from all over the world, especially female travelers, has been one of the most enriching experiences. They bring their unique perspectives, share their stories, and inspire you to continue your journey. There's something special about welcoming tourists into our home and exchanging stories. It makes me realize how much we all share as human beings, regardless of where we come from. The idea of stepping into a new place always excites me. Whether it's the sound of a new language, the scent of foreign food in the air, or the beauty of unknown landscapes, the thrill of exploration never fades. Traveling is essential for happiness; it broadens our minds, gives us a deeper appreciation for life, and fills us with memories that last a lifetime. Traveling is not just about escaping the routine; it's about connecting with people, discovering new passions, and finding joy in the little things. It's a reminder that the world is bigger than our worries, and every new journey has the potential to make us a better, happier person."
},

{
  id: 7,
  title: "My Journey into the World of Technology: A Path of Dedication and Growth",
  author: "Aqsa Shah",
  author_img: "/assets/author.jpeg",
  image: "/assets/techblog1.jpeg",
  description: "It all started when I first heard about the Governor of Sindh IT initiative. The idea of getting involved in technology excited me, and I decided to fill out the application form. Little did I know that this would mark the beginning of an incredible journey. After sending in my form, I had to take a test, and to my immense joy, I was selected for the onsite opportunity. The day I received the confirmation was one of the happiest days of my life. My family was thrilled, and I could not stop smiling. This moment marked a turning point in my life, as it opened the doors to the world of technology for me. Soon after, the wait was over, and the classes began. I want to express my gratitude to the Governor of Sindh and the entire faculty who worked tirelessly to ensure the success of this initiative. They played a pivotal role in helping me reach where I am today. For a long time, I lived away from home, staying at my uncles place in Karachi while I attended this 7-hour-long drive to my classes. My family is from Naushahro Feroze, and though I miss them dearly, I knew I had to do this. The experience was both challenging and rewarding. I threw myself into my work, dedicating countless hours day and night to learning coding and AI. I started with no background in IT, but with determination, I gradually made my way through the course. As time passed, I became a senior student and enrolled in another course at PIAIC. Today, I am not only learning at PIAIC but also diving deep into the world of generative AI. Its a challenging yet exciting field, and Im grateful for the opportunity. At the same time, I am now in my second quarter at the Governor House, far from home, but I continue to work hard and remain focused on my goal of reaching a high position. My brother has been incredibly supportive throughout this journey, and I want to thank him for always being there for me. Looking back, I realize how far I have come. From not knowing much about IT to now being an active student in one of the most promising fields, my journey has been nothing short of a dream. And I am determined to continue working hard, learning, and eventually achieving the success I have always dreamed of."
},

{
  id: 8,
  title: "Essential Skills and Technologies for 2025",
  author: "Aqsa Shah",
  author_img: "/assets/author.jpeg",
  image: "/assets/tech.jpeg",
  description: "1. Programming Languages to Learn in 2025 In the ever-changing world of software development, certain programming languages remain foundational, while others emerge as game-changers. Here’s what you should focus on: a. Python Python has been a favorite for several years and continues to dominate in 2025. Its simplicity, versatility, and extensive libraries make it a go-to language for AI, machine learning, web development, and data analysis. b. JavaScript and TypeScript JavaScript powers the web, and its strongly-typed counterpart, TypeScript, is gaining significant traction due to its ability to catch errors early. Together, they are indispensable for building modern web and mobile applications. c. Rust Known for its focus on safety and performance, Rust is becoming a critical language for system-level programming and cybersecurity. Its popularity is driven by industries that demand speed without compromising reliability. d. Kotlin As Android remains a dominant mobile platform, Kotlin is a must-learn language for aspiring app developers. It’s Google’s preferred language for Android development, offering concise syntax and modern features. e. R and Julia For those diving into data science or high-performance computing, R and Julia are languages worth learning. They are tailored for statistical analysis and computational-heavy tasks. f. SQL Even with the rise of NoSQL databases, SQL remains a cornerstone of data management. Understanding how to query, update, and manage relational databases is a timeless skill. 2. Why AI Is Essential for Everyone AI has transcended the boundaries of specialized fields and is now integrated into daily life. From chatbots to recommendation systems and voice assistants, AI powers tools we use every day. In 2025, having a basic understanding of AI concepts is no longer optional, even for non-technical individuals. How Much AI Knowledge Should the Average Person Have? Basic AI Concepts: Understand terms like machine learning, neural networks, and algorithms. You don’t need to be an expert, but you should grasp the basics to engage with AI-driven technologies responsibly. Ethical Implications: Be aware of the ethical challenges AI presents, including data privacy and biases in AI models. Practical Usage: Learn to use AI-powered tools, such as image editing apps, productivity boosters, and personal finance advisors, to enhance your efficiency. 3. Technologies You Should Explore To prepare for a future shaped by technology, here are the top fields you should explore: a. Generative AI Generative AI, popularized by tools like ChatGPT and MidJourney, is revolutionizing content creation, design, and even software development. Learning to work with such tools can save time and open new opportunities. b. Cloud Computing Understanding platforms like AWS, Azure, and Google Cloud is critical. The cloud is the backbone of modern IT infrastructure, enabling businesses to scale quickly and efficiently. c. Blockchain and Web3 While the crypto hype has settled, blockchain technology remains crucial for secure, decentralized solutions. Web3 is an extension of this, enabling more user control over data and privacy. d. Cybersecurity As cyber threats increase, cybersecurity skills are more important than ever. From ethical hacking to advanced threat detection, this is a field ripe with opportunities. e. Quantum Computing Quantum computing is still in its infancy but is expected to revolutionize fields like cryptography and complex simulations. Keeping an eye on this space could prove beneficial. 4. Soft Skills to Complement Technical Knowledge While technical skills are vital, soft skills will distinguish you in 2025’s competitive landscape: Critical Thinking: Evaluate technological trends critically to adapt effectively. Adaptability: The tech world evolves quickly; staying flexible is key. Communication: Explaining complex ideas in simple terms is a valuable skill, especially in cross-disciplinary teams. Final Thoughts 2025 promises to be a year of incredible technological growth. By learning the right programming languages, understanding AI, and exploring emerging fields, you can position yourself as a forward-thinking professional. The key is to stay curious, embrace lifelong learning, and adapt to the changing landscape. Start today, and let 2025 be your year of growth and innovation!",
},

 
  {
    id: 9,
    title: ".....",
    author: "Aqsa Shah",
    author_img: "/assets/author.jpeg",
    image: "/assets/art.jpeg",
    description: "This is a sample blog description.",
  },
  {
    id: 10,
    title: "Sample Blog Title",
    author: "Author Name",
    author_img: "/assets/author.jpeg",
    image: "/assets/artsblog2.jpeg",
    description: "This is a sample blog description.",
  },
  {
    id: 11,
    title: "Sample Blog Title",
    author: "Author Name",
    author_img: "/assets/author.jpeg",
    image: "/assets/makeup2.jpeg",
    description: "This is a sample blog description.",
  },
  {
    id: 12,
    title: "Sample Blog Title",
    author: "Author Name",
    author_img: "/assets/author.jpeg",
    image: "/assets/makeup1.jpeg",
    description: "This is a sample blog description.",
  },

  // Add other blog data here...
];

const Page = () => {
  const [data, setData] = useState();
  const { id } = useParams();  

  const fetchBlogData = () => {
    const blog = blog_data.find((blog) => blog.id === Number(id));  
    if (blog) {
      setData(blog);
    }
  };



  useEffect(() => {
    fetchBlogData();
  }, [id]); 

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen py-5 px-5 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png" 
              width={180}
              height={60}
              alt="Logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-white text-white hover:bg-black shadow-[0_0_15px_5px_rgba(255,255,255,1)] rounded-full ">
            Get Started
            <FaArrowRight />
          </button>
        </div>
        <div className="text-center my-24 ">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-white">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white  shadow-[0_0_15px_5px_rgba(255,255,255,1)] rounded-full"
            src={data.author_img}
            width={60}
            height={60}
            alt="Author"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto text-white">
            {data.author}
          </p>
        </div>
      </div>
  
      <div className="mx-5 max-w-[1300px] md:mx-auto mt-[-100px] mb-1 bg-blue-900 flex justify-center">
  <Image
    className="border-4 border-white shadow-[0_0_15px_5px_rgba(255,255,255,1)] "
    src={data.image}
    width={800}
    height={400}
    alt="Blog Image"
  />
</div>


        <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen text-white pt-2 flex items-center justify-center px-8">
  <div className="max-w-3xl text-center">
    <h1 className="my-8 text-[26px] font-semibold">A Bond Beyond Words</h1>
    <p className="leading-relaxed">{data.description}</p>

    <div className="my-24">
      <p className="text-white font-semibold my-4">
        Share this article on social media
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="https://github.com/Dev-AqsaShah"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-white text-2xl hover:text-gray-400 transition"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://linkedin.com/in/aqsa-shah-"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white text-2xl hover:text-gray-400 transition"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="https://www.instagram.com/developer_aqsashah?igsh=MTJ4dW9vZ211Zm5sMA=="
          passHref
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white text-2xl hover:text-gray-400 transition"
        >
          <FaInstagram />
        </Link>
      </div>
    </div>
  </div>
</div>


      <Footer />
    </>
  );
};

export default Page;
