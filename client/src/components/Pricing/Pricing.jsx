import axios from 'axios';
import React, { useState } from 'react';
import styles from "./styles.module.css";
// import { useSession } from 'next-auth/react';

// Stripe Plans >> fill in your own priceId & link
export const plans = [
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_8wM2aR5sQ1Ht9205ko' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1RdCwsIImGcHCAj8cc1JoZ6K' : '',
        price: 6.99,
        duration: '/ luna'
    },
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_dR63eV2gEdqbba8bIN' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1RdCxgIImGcHCAj8iWqDnLuS' : '',
        price: 39.99,
        duration: '/ 6 luni',
        discount: 5,
    },
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_cN2cPv5sQ5XJfqo9AG' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1RdCyJIImGcHCAj8if6fIGS1' : '',

        price: 74.99,
        duration: '/ an',
        discount: 11,
    }
];

const checkout = (plan, uid) => {
    axios.post("/api/create-subscription-checkout-session", {
        plan: plan,
        customerId: uid
    })
    // .then((res) => {
    //     if (res.ok) return res.json();
    //     console.log(res);
    //     return res.json().then((json) => Promise.reject(json));
    // })
    .then((res) => {
        window.location = res.data.session.url;
    })
    .catch((e) => {
        console.log(e);
    });
};

const Pricing = ({ uid }) => {
    // const { data: session } = useSession();
    const [plan, setPlan] = useState(plans[2]);

    return (
        <div className={styles.container + "container px-auto py-10"}>
            <section id="pricing">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col text-center w-full mb-2">
                        <p className="font-medium text-primary mb-1">Nu sunteti inca abonat!</p>
                        <h2 className="font-bold text-3xl lg:text-4xl tracking-tight">
                            Abonament CuriaChronos
                        </h2>
                    </div>

                    {plan?.discount ? <h5 className='text-center'>Economisesti {plan.discount}% / an</h5> : <></>}

                    <div className="relative flex justify-center items-center flex-col lg:flex-row lg:items-stretch gap-8">
                        <div className=" w-full max-w-lg">
                            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-3 rounded-xl">
                                <div className="flex items-center justify-center gap-8 text-sm">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setPlan(plans[0])}
                                    >
                                        <input
                                            type="radio"
                                            name="monthly"
                                            className="radio"
                                            checked={plan.price === 6.99}
                                        />
                                        <span>Plata Lunara</span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setPlan(plans[1])}
                                    >
                                        <input
                                            type="radio"
                                            name="quarterly"
                                            className="radio"
                                            checked={plan.price === 39.99}
                                        />
                                        <span>Plata Semestriala</span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setPlan(plans[2])}
                                    >
                                        <input
                                            type="radio"
                                            name="yearly"
                                            className="radio"
                                            checked={plan.price === 74.99}
                                        />
                                        <span>Plata Anuala</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <p
                                        className={`text-5xl tracking-tight font-extrabold`}
                                    >
                                        €{plan.price}
                                    </p>
                                    <div className="flex flex-col justify-end mb-[4px]">
                                        <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                                            {plan.duration}
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-1 leading-relaxed text-base flex-1">
                                    {[
                                        {
                                            name: 'Lista nelimitata de dosare'
                                        },
                                        { name: 'Calendar completat automat cu termenele dosarelor din lista' },
                                        { name: 'Notificari email pentru termene si modificari in dosare' },
                                        { name: 'Legatura permanenta cu aplicatia portal.just.ro' },
                                        { name: 'Suport tehnic nelimitat' },
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-[18px] h-[18px] opacity-80 shrink-0"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <span>{feature.name} </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="space-y-2">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        className="btn btn-primary btn-block "
                                        target="_blank"
                                        // href={
                                        //     plan.link +
                                        //     '?prefilled_email=' +
                                        //     session?.user?.email
                                        // }
                                        onClick={() => {checkout(Number(plan.price), uid)}}
                                    >
                                        Subscribe
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;