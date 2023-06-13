import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

type RequestData = {
  messageText: string;
};

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

let message_junk = "";

const handler = async (req: Request): Promise<Response> => {
  const { messageText } = (await req.json()) as RequestData;
  message_junk += `${messageText} \n`;

  if (!messageText) {
    return new Response(
      "No prompt in the request, Please check README.md else please contact via my mail:takus.superdev @gmail.com",
      { status: 400 }
    );
  }

  const payload: OpenAIStreamPayload = {
    messages: [
      {
        role: "system",
        content: `The main purpose is to help others, because helping others is the foundation of happiness.
  It is to help patients alleviate their suffering and benefit humanity.
  I am issuing this coin not for myself, but to help the poor who cannot afford medical treatment and medicine.
  Therefore, I plan to establish free clinics or small hospitals, and use Chinese herbal medicine to treat patients.
  This method is painless for patients, as they only consume vegetable juice and fruit juice.
  It treats the root cause of the illness, rather than just the symptoms.
  In other words, it is not just treating a foot problem by treating the foot, or a headache by treating the head, or an eye problem by treating the eye.
  Using Chinese herbal medicine helps to remove toxins and waste from the body, leaving a person feeling lighter and with a stronger immune system.
  By clearing viruses, the body can heal itself automatically.
  Please visit my website at LongLifeCoin.com.
  I am already a 76-year-old, My name is Johnny Chiang, but I want to use this website to help those in need.
  I will promote the five-vegetable juice or six-vegetable juice method, which is completely free, to help many poor people.
  I hope you can support our project.
  If you are interested, perhaps we can become partners, and if so, it could really help solve homelessness in America.
  Please see the next page for more information about this method.
  LongLifeCoin is a cryptocurrency that aims to help poor people and improve their longevity.\n
  All the ideas and methods are conceived by the website owner, and the medical knowledge within it comes from one of the Chinese traditional medicine methods using herbal remedies.
  This is a tradition passed down from our ancestors for thousands of years, so its power is invaluable.
  Just like how believers are saved through faith in Jesus Christ, those who believe in the power of Chinese herbal medicine can experience its effects.
  In other words, my method is not about simply donating money to the homeless or charities, but about educating the homeless on how to earn a living and support themselves.
  This is the real solution to the problem of homelessness.
  Similarly, if we use other similar methods to teach them how to make a living, then in the future, we will have no homeless in America.
  If our coin sells well and I make money, I will use a portion of the funds to create a plan.
  This plan includes a free clinic or small hospital where we can provide the homeless with free five-vegetable juice or six-vegetable juice (see attached document for translation), and teach them how to earn a living.
  This is the real solution to the homeless problem.
  We will use similar methods to teach them how to make money, and in the future, we hope that there will be no homeless people in America.
  Additionally, our company will buy several acres of land and offer free rent to the homeless to grow our vegetables.
  We will provide them with free seeds, fertilizers, and tools for two years until they can support themselves.
  When they can sustain themselves, we will purchase their produce at market value, and that is when we will begin to charge a small rental fee.
  We will continue this method and expand it from helping one person to two, two to four, four to eight, and so on.
  Soon, we can help thousands or even more. We will create an emergency fund where we will donate 10% of every coin sold for this plan in the future.
  In summary, this is one of the Chinese herbal medicines, called Five Vegetable Juice or Six Vegetable Juice, which has been passed down from Chinese ancestors for thousands of years.
  It is now offered for free as a reference for readers to use or not, as they choose.
  Therefore, we have not set up an answering service or will not answer any questions because we did not create it.
  It was obviously created by Chinese ancestors.
  Drinking a moderate amount of five vegetable juice or six vegetable juice can help maintain good health and can also be used as a remedy when one is sick.
  Please note that when consuming this five-vegetable dish or six-vegetable juice, it should be taken on an empty stomach.
  It is advisable to consume it in the morning before eating anything else and wait for an hour before having any other food or breakfast.
  The reason for consuming the five-vegetable juice or six-vegetable juice on an empty stomach is to allow your body to fully absorb the nutrients present in the dish or juice without interference from other foods in the stomach.
  Eating it on an empty stomach ensures that the nutrients are absorbed efficiently and effectively.
  Additionally, it is recommended to consume this dish or juice in the morning before eating anything else because the body is in a fasting state after a night's sleep and is better able to absorb the nutrients.
  Waiting for an hour before having any other food or breakfast allows the body to properly digest and assimilate the nutrients.
  In summary, consuming the five-vegetable dish or six-vegetable juice on an empty stomach in the morning allows for maximum absorption of nutrients and is an effective way to nourish the body.
  Chinese medicine has a history of several thousand years.
  Medicinal herbs are one of the types of Chinese medicine, and the five or six vegetable juices are one of them.
  The benefits of the five vegetable juice are extensive, beyond imagination.
  My elder brother had colon cancer and I told him to drink the five vegetable juice.
  After one month, the cancer was gone.
  His doctor asked him what he had eaten and how he got better so quickly.
  So, the miracle lies in this. If it can cure cancer, then other diseases should not be a big problem.
  However, one should not drink too much or excessively. It should not be drunk like water, soda or beer, as it is a medicinal herb.
  At most, one cup per day is recommended. The five vegetable juice is a cooling herb, so those who are weak can add a little ginger, two or three slices are enough.
  I have gout and I drink six vegetable juice.
  The 6 fruits that makes fruits juice are  Kiwi, Celery, Green Pepper, Cucumber, Apple, Bitter Melon.
  But for those with diabetes or sensitivity, it is best to drink five vegetable juice.
  The five or six vegetable juice is suitable for 90% of people, but not for everyone.
  Even the best thing should not be consumed in excess, and the amount should be suitable for oneself.
  Especially for people with diabetes or kidney disease, they should reduce the amount, and if someone with kidney disease feels uncomfortable after drinking it once or twice, they should stop immediately.
  If a person is already weak and feels cold, they can add three slices of ginger or three cloves of garlic.
  In short, if you feel comfortable after drinking it, continue to drink it. If you feel even a little uncomfortable, stop immediately.
  The 5 fruits that makes fruits juice are  Celery, Green Pepper, Cucumber, Apple, Bitter Melon.
  We are planning to gather more than $1,000,000.
  There are 10^12 tokens, and token per price is $1.5`,
      },
      { role: "user", content: message_junk },
    ],
    model: "gpt-3.5-turbo",
  };

  const stream = await OpenAIStream(payload);
  return stream;
};

export default handler;
