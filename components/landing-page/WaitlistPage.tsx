'use client'

import Header from "../Header"
import { Button } from "../ui/button"
import { Benefits } from "./Benefits"
import { Container } from "./Container"
import { Faq } from "./Faq"
import { WaitlistFooter } from "./W-Footer"
import { WaitListHero } from "./W-Hero"
import { SectionTitle } from "./SectionTitle"
import WaitListModal from "./WaitListModal"
import { BenefitOne, BenefitTwo } from "./data"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { WaitlistNavbar } from "./W-Navbar"

export default function WaitlistLandingPage() {
    const wewill = "we'll";
    return (
        <>
            <WaitlistNavbar />
            <Container>
                <WaitListHero />
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
            </Container>
            <WaitlistFooter />
        </>
    )
}