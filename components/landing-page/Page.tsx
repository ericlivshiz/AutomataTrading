'use client'

import Header from "../Header"
import { Button } from "../ui/button"
import { Benefits } from "./Benefits"
import { Container } from "./Container"
import { Faq } from "./Faq"
import { Footer } from "./Footer"
import { Hero } from "./Hero"
import { SectionTitle } from "./SectionTitle"
import { BenefitOne, BenefitTwo } from "./data"

export default function LandingPage() {
    return (
        <>
            <Header>
                <div className="flex items-center gap-2 lg:gap-4">
                    <Button className="bg-indigo-600">
                        Join Wait List
                    </Button>
                </div>
            </Header>
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
                    When Automata Trading is set up, we'll take inquiries by mail. For now, here are some questions 
                    we commonly get.
                </SectionTitle>
                <Faq />
            </Container>
            <Footer />
        </>
    )
}