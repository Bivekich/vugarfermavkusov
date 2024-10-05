import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";
import { getCart } from "../utils/cartUtils";
import axios from "axios";
// import { sendMail } from "../utils/mailUtils";

const Order = () => {
  const [cartItems, setCartItems] = useState([]); // Состояние для хранения товаров в корзине
  const [currentStep, setCurrentStep] = useState(0); // Текущий этап оформления заказа
  const [selectedDay, setSelectedDay] = useState(null); // Выбранный день
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const generateFourDigitCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const code = generateFourDigitCode();
  const address = "ул. Нефтяная 15 г.Томск";
  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      console.log(newStep); // Log the new step value
      return newStep;
    });
  };

  // Генерация ближайших 6 дней недели
  const generateNextDays = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const day = addDays(new Date(), i);
      days.push({
        date: day,
        dayOfWeek: format(day, "EE", { locale: ru }), // День недели на русском
        dayOfMonth: format(day, "dd MMM", { locale: ru }), // День месяца
      });
    }
    return days;
  };

  const days = generateNextDays();

  // for sending
  // selectedDay
  // phone
  // email
  // code
  const handleOrder = () => {
    const subject_buyer = "Ваш заказ на сайте fermavkusov";
    const text_buyer = `Ваш номер заказа: ${code}`;
    axios
      .post("http://localhost:3000/send-email", {
        to: email,
        subject: subject_buyer,
        text: text - buyer,
      })
      .then(function (response) {
        console.log("Success:", response.data);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });

    const subject_seller = "Новый заказ на сайте fermavkusov";
    const text_seller = `Новый заказ с номером ${code} на сумму ${total} рублей\n
    Номер телефона покупателя: ${phone}\n
    ${cartItems.map(
      (item, index) =>
        `${index + 1}) ${item.title} в количетсве ${item.quantity} ${
          item.per
        } \n`
    )}
    `;

    axios
      .post("http://localhost:3000/send-email", {
        to: "admin@fermavkusov.ru",
        subject: subject_seller,
        text: text_seller,
      })
      .then(function (response) {
        console.log("Success:", response.data);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  return (
    <div className="py-10 2xl:py-12 checkout mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="flex flex-col mx-auto xl:max-w-screen-xl">
        <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
          <div className="w-full col-start-1 col-end-9">
            <div className="border rounded-md border-border-base text-brand-light">
              <div
                className={`accordion__panel border-b border-border-base ${
                  currentStep === 0 ? `expanded` : `collapsed`
                }`}
                onClick={() => setCurrentStep(0)}
              >
                <div
                  id="index_0"
                  key={0}
                  className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button gap-2"
                >
                  <span className="flex items-center justify-center font-semibold border-2 border-current rounded-full h-9 w-9 text-brand ltr:mr-3 rtl:ml-3">
                    1
                  </span>
                  <h3 className="text-brand-dark text-15px sm:text-base font-semibold">
                    Место получения
                  </h3>
                </div>
                <div
                  data-aria-label="index_0"
                  className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content px-2"
                >
                  <div className="mb-6">
                    <div className="flex flex-col justify-between h-full -mt-4 text-15px md:mt-0">
                      <div
                        className="space-y-4 md:grid md:grid-cols-2 md:gap-5 auto-rows-auto md:space-y-0"
                        id="headlessui-radiogroup-:r2l:"
                        role="radiogroup"
                        aria-labelledby="headlessui-label-:r2m:"
                      >
                        <label
                          className="sr-only"
                          id="headlessui-label-:r2m:"
                          role="none"
                        >
                          address
                        </label>

                        <div
                          className="border-brand
                  border-2 relative focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box"
                          id="headlessui-radiogroup-option-:r2q:"
                          role="radio"
                          aria-checked="true"
                          tabIndex="0"
                          data-headlessui-state="checked"
                          aria-labelledby="headlessui-label-:r2r:"
                          aria-describedby="headlessui-description-:r2s:"
                        >
                          <h3
                            className="mb-2 -mt-1 font-semibold text-brand-dark "
                            id="headlessui-label-:r2r:"
                          >
                            Офис
                          </h3>
                          <div
                            className="leading-6 text-brand-muted"
                            id="headlessui-description-:r2s:"
                          >
                            г. Иваново Ул. Лежневская, д. 167 магазин
                            Экопродукты
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ltr:text-right rtl:text-left">
                    <button
                      onClick={(event) => {
                        event.stopPropagation(); // Prevents event from bubbling up
                        setCurrentStep(1);
                      }}
                      className="group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-11 md:h-[50px] bg-brand text-brand-light font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70 px-4 py-3 text-sm font-semibold rounded bg-brand text-brand-light"
                    >
                      Следующий шаг
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`accordion__panel border-b border-border-base ${
                  currentStep === 1 ? `expanded` : `collapsed`
                }`}
                onClick={() => setCurrentStep(1)}
              >
                <div
                  id="index_1"
                  key={1}
                  className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button gap-2"
                >
                  <span className="flex items-center justify-center font-semibold border-2 border-current rounded-full h-9 w-9 text-brand ltr:mr-3 rtl:ml-3">
                    2
                  </span>
                  <h3 className="text-brand-dark text-15px sm:text-base font-semibold">
                    Время получения заказа
                  </h3>
                </div>
                <div
                  data-aria-label="index_1"
                  className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content px-2"
                >
                  <div className="mb-6">
                    <div className="w-full">
                      <div className="w-full mx-auto">
                        <div
                          id="headlessui-radiogroup-:r1g:"
                          role="radiogroup"
                          aria-labelledby="headlessui-label-:r1h:"
                        >
                          <label
                            className="sr-only"
                            id="headlessui-label-:r1h:"
                            role="none"
                          >
                            Delivery Schedule
                          </label>
                          <div
                            className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6"
                            role="list"
                          >
                            {days.map((day, index) => (
                              <div
                                className={`relative rounded-lg px-1 py-3 cursor-pointer focus:outline-none ${
                                  selectedDay === index
                                    ? `bg-brand text-brand-light`
                                    : `bg-gray-100`
                                }`}
                                id="headlessui-radiogroup-option-:r1i:"
                                key={index}
                                role="radio"
                                aria-checked={selectedDay === index}
                                tabIndex={0}
                                data-headlessui-state=""
                                onClick={() => setSelectedDay(index)}
                                aria-labelledby="headlessui-label-:r1j:"
                                aria-describedby="headlessui-description-:r1k:"
                              >
                                <div className="text-center">
                                  <p
                                    className={`text-base font-semibold ${
                                      selectedDay === index
                                        ? `text-brand-light`
                                        : `text-gray-900`
                                    } `}
                                    id="headlessui-label-:r1j:"
                                  >
                                    {day.dayOfWeek}
                                  </p>
                                  <span
                                    className={`text-15px ${
                                      selectedDay === index
                                        ? `text-brand-light`
                                        : `text-gray-500`
                                    }`}
                                    id="headlessui-description-:r1k:"
                                  >
                                    {day.dayOfMonth}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ltr:text-right rtl:text-left">
                    <button
                      onClick={(event) => {
                        event.stopPropagation(); // Prevents event from bubbling up
                        setCurrentStep(2);
                      }}
                      type="button"
                      className="group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-11 md:h-[50px] bg-brand text-brand-light font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70 px-4 py-3 text-sm font-semibold rounded bg-brand text-brand-light"
                    >
                      Следующий шаг
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`accordion__panel border-b border-border-base ${
                  currentStep === 2 ? `expanded` : `collapsed`
                }`}
                onClick={() => setCurrentStep(2)}
              >
                <div
                  id="index_2"
                  key={2}
                  className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button gap-2"
                >
                  <span className="flex items-center justify-center font-semibold border-2 border-current rounded-full h-9 w-9 text-brand ltr:mr-3 rtl:ml-3">
                    3
                  </span>
                  <h3 className="text-brand-dark text-15px sm:text-base font-semibold">
                    Контактная информация
                  </h3>
                </div>
                <div
                  data-aria-label="index_2"
                  className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content px-2"
                >
                  <div className="mb-6">
                    <div className="w-full max-w-[1300px] mx-auto">
                      <div className="flex flex-wrap">
                        <div className="w-full">
                          <div className="text-[15px] text-brand-dark ">
                            <div
                              className="grid grid-cols-1 gap-5 md:grid-cols-2 auto-rows-auto"
                              id="headlessui-radiogroup-:r2t:"
                              role="radiogroup"
                              aria-labelledby="headlessui-label-:r2u:"
                            >
                              <label
                                className="sr-only"
                                id="headlessui-label-:r2u:"
                                role="none"
                              >
                                Default
                              </label>
                              <div
                                className="border-border-base
                  border-brand
                  border-2 relative focus:outline-none rounded p-5 block cursor-pointer min-h-[112px] h-full group address__box flex flex-col"
                                id="headlessui-radiogroup-option-:r2v:"
                                role="radio"
                                aria-checked="true"
                                tabIndex="0"
                                data-headlessui-state="checked"
                                aria-labelledby="headlessui-label-:r30:"
                                aria-describedby="headlessui-description-:r31:"
                              >
                                <h2
                                  className="mb-2 font-semibold"
                                  id="headlessui-label-:r30:"
                                >
                                  Контактная информация
                                </h2>
                                <div
                                  className="flex flex-row w-full"
                                  id="headlessui-description-:r31:"
                                >
                                  <input
                                    type="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border-border-base
                  border-brand
                  border-2 relative focus:outline-none rounded py-0 px-5 block cursor-pointer h-fit w-1/2 group address__box"
                                    id="headlessui-radiogroup-option-:r2v:"
                                    placeholder="Номер телефона"
                                  />
                                  <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-border-base
                  border-brand
                  border-2 relative focus:outline-none rounded py-0 px-5 block cursor-pointer h-fit w-1/2 group address__box"
                                    id="headlessui-radiogroup-option-:r2v:"
                                    placeholder="Эл. Почта"
                                  />
                                </div>
                                <div className="absolute z-30 flex transition-all ltr:right-3 rtl:left-3 top-3 lg:opacity-0 address__actions">
                                  <button className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80">
                                    <svg
                                      stroke="currentColor"
                                      fill="currentColor"
                                      strokeWidth="0"
                                      version="1.2"
                                      baseProfile="tiny"
                                      viewBox="0 0 24 24"
                                      height="1em"
                                      width="1em"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M21 6.879l-3.879-3.879c-.293-.293-.678-.439-1.061-.439-.384 0-.767.146-1.06.439l-10.939 10.939c-.293.293-.558.727-.75 1.188-.192.463-.311.959-.311 1.373v4.5h4.5c.414 0 .908-.119 1.371-.311.463-.192.896-.457 1.189-.75l10.94-10.939c.293-.293.439-.678.439-1.061 0-.384-.146-.767-.439-1.06zm-15.232 8.182l8.293-8.293 1.232 1.232-8.293 8.293-1.232-1.232zm1.732 3.939h-1.5l-1-1v-1.5c0-.077.033-.305.158-.605.01-.02 2.967 2.938 2.967 2.938-.322.134-.548.167-.625.167zm1.439-.768l-1.232-1.232 8.293-8.293 1.232 1.232-8.293 8.293zm9-9l-3.172-3.172 1.293-1.293 3.17 3.172-1.291 1.293z"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ltr:text-right rtl:text-left">
                    <button
                      onClick={(event) => {
                        event.stopPropagation(); // Prevents event from bubbling up
                        setCurrentStep(3);
                      }}
                      type="button"
                      className="group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-11 md:h-[50px] bg-brand text-brand-light font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70 px-4 py-3 text-sm font-semibold rounded bg-brand text-brand-light"
                    >
                      Следующий шаг
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`accordion__panel border-b border-border-base ${
                  currentStep === 3 ? `expanded` : `collapsed`
                }`}
                onClick={() => setCurrentStep(3)}
              >
                <div
                  id="index_4"
                  key={3}
                  className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button gap-2"
                >
                  <span className="flex items-center justify-center font-semibold border-2 border-current rounded-full h-9 w-9 text-brand ltr:mr-3 rtl:ml-3">
                    4
                  </span>
                  <h3 className="text-brand-dark text-15px sm:text-base font-semibold">
                    Дополнительная информация (опционально)
                  </h3>
                </div>
                <div
                  data-aria-label="index_4"
                  className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content px-2"
                >
                  <div className="mb-6">
                    <div className="w-full">
                      <div className="w-full mx-auto">
                        <form noValidate="">
                          <div className="mb-6">
                            <div>
                              <label
                                htmlFor="instructionNote"
                                className="block text-brand-dark opacity-70 font-normal text-13px lg:text-sm leading-none mb-3 cursor-pointer"
                              >
                                Дополнительная информация
                              </label>
                              <textarea
                                id="instructionNote"
                                name="instructionNote"
                                className="px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-brand-dark text-13px lg:text-sm focus:outline-none focus:ring-0 placeholder-[#B3B3B3] bg-white border border-border-two focus:shadow focus:outline-none focus:border-heading focus:border-2 focus:outline-none focus:border-brand"
                                autoComplete="off"
                                spellCheck="false"
                                rows="4"
                                placeholder=""
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
            <div className="px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
              <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
                <span className="font-medium text-15px text-brand-dark">
                  Корзина
                </span>
              </div>
              <div className="flex items-center py-4 border-b border-border-base">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <>
                      <div
                        key={item.id}
                        className="flex w-16 h-16 border rounded-md border-border-base shrink-0 gap-5"
                      >
                        <img
                          alt="item image"
                          loading="lazy"
                          width="64"
                          height="64"
                          decoding="async"
                          data-nimg="1"
                          className="rounded-md ltr:mr-5 rtl:ml-5"
                          src={item.image}
                          style={{ color: "transparent", width: "auto" }}
                        />
                        <div className="flex flex-col">
                          <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
                            {item.title}
                          </h6>
                          <div className="flex font-normal ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
                            {item.price}₽&nbsp;X&nbsp;{item.quantity}
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <p className="empty-cart">Корзина пуста</p>
                )}
              </div>
              <div className="flex items-center w-full py-4 text-sm font-medium border-b lg:py-5 border-border-base text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0 gap-1">
                Итого
                <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
                  {total}₽
                </span>
              </div>
              <button
                onClick={(e) => handleOrder}
                className="group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-11 md:h-[50px] bg-brand text-brand-light font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70 w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all !bg-brand !text-brand-light"
              >
                Заказать сейчас
              </button>
            </div>
            {/* <p className="text-brand-muted text-sm leading-7 lg:leading-[27px] lg:text-15px mt-8">
              By placing your order, you agree to be bound by the BoroBazar{" "}
              <a className="font-medium underline text-brand" href="/en/terms">
                Terms of Service{" "}
              </a>
              and{" "}
              <a
                className="font-medium underline text-brand"
                href="/en/privacy"
              >
                Privacy
              </a>
              . Your credit/debit card data will not saved.
            </p>
            <p className="text-brand-muted text-sm leading-7 lg:leading-[27px] lg:text-15px mt-4">
              A bag fee may be added to your final total if required by law or
              the retailer. The fee will be visible on your receipt after
              delivery.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
