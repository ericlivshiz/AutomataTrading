const LearnWorkflow = () => {
    const whats = "What's";
    const CreateaNewWorkflow = "'Create a New Workflow'";

    return (
        <section id="Workflow Editor">
            <h1 className="text-3xl font-bold mb-4 text-indigo-500">Get started with Automata Trading</h1>
            <p className="text-lg text-gray-200 mb-6">
                Automata Trading has 3 Core Functionalities...
            </p>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-500">Workflow Editor</h2>

                <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-3">{whats} a Workflow</h3>
                    <p className="mb-4 text-gray-300">
                        A workflow is a place to create a trading strategy! It is the instructions you make, which
                        will be used to execute trades, send you notifications, etc. Automata Trading offers collaborative
                        workflows, which allows you to invite people to your workflows.
                    </p>
                    <p className="mb-4 text-gray-300">
                        A workflow, or trading strategy, is comprised of 3 parts. The trigger, condition, and action.
                    </p>
                </div>

                {/* Creating Workflows section */}
                <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-3">Creating Workflows</h3>
                    <p className="mb-4 text-gray-300">
                        In order to create a workflow, you first need to make an account (you can sign in with Google). After this, you will be taken to the home page which will show all workflows made.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-md whitespace-pre-wrap">
                        Click on {CreateaNewWorkflow} in the top right. You will be prompted to select a market. Once you save your market selection, a workflow gets created.
                    </pre>

                </div>

                {/* Sharing Workflows section */}
                <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">Sharing Workflows</h3>
                    <p className="mb-4 text-gray-300">
                        After creating a workflow, you can share it with others. Sharing workflows allows users to work in teams to create strategies.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-md whitespace-pre-wrap">
                        Use the share button on the workflow page to copy the link or invite other users to join and modify the workflow.
                    </pre>
                </div>
            </div>
        </section>
    )
}

export default LearnWorkflow;