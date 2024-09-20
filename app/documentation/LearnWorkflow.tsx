const LearnWorkflow = () => {
    return (
        <section id="Workflow Editor">
            <h1 className="text-3xl font-bold mb-4 text-indigo-500">Get started with Automata Trading</h1>
            <p className="text-lg text-gray-200 mb-6 text-indigo-300">
                Automata Trading has 3 Core Functionalities...
            </p>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-500">Workflow Editor</h2>

                {/* Creating Workflows section */}
                <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-300">1. Creating Workflows</h3>
                    <p className="mb-4 text-gray-300">
                        In order to create a workflow, you first need to make an account (you can sign in with Google). After this, you will be taken to the home page which will show all workflows made.
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-md whitespace-pre-wrap">
                       Click on "Create a New Workflow" in the top right. You will be prompted to select a market. Once you save your market selection, a workflow gets created. 
                    </pre>

                </div>

                {/* Sharing Workflows section */}
                <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-300">2. Sharing Workflows</h3>
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