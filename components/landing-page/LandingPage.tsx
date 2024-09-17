'use client'

import React from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Container } from "./Container";
import { SectionTitle } from "./SectionTitle";
import { Benefits } from "./Benefits";
import { Faq } from "./Faq";
import { BenefitOne, BenefitTwo } from "./data";
import { Footer } from "./Footer";

const LandingPage = () => {
    const wewill = "we'll";

    return (
        <>
            <Navbar />
            <Container>
                <Hero />
                <SectionTitle
                    preTitle="Automata Benefits"
                    title=" Why use Automata Trading?"
                >
                    By providing a no-code environment and a data-driven marketplace, Automata Trading opens
                    up the world of algorithmic trading to a broader audience, allowing anyone with basic
                    trading knowledge to create and deploy bots quickly.
                </SectionTitle>
                <Benefits data={BenefitOne} />
                <Benefits imgPos="right" data={BenefitTwo} />

                <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
                    When Automata Trading is set up, {wewill} take inquiries by mail. For now, here are some questions
                    we commonly get.
                </SectionTitle>
                <Faq />
                <Footer />
            </Container>
        </>
    )
}

export default LandingPage;