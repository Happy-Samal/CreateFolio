import React from 'react'
import { Helmet } from 'react-helmet-async';

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>CreateFolio - privacy and policy</title>
        <meta name="description" content="CreateFolio - provide a platform where you make your portfolio in second" />
      </Helmet>
      <div className="text-white relative pt-40">
        <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="text-gray-200 mb-6">
              <strong>Effective Date:</strong>{new Date().getFullYear()}
            </p>
            <p className="text-gray-200 mb-6">
              At CreateFolio, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information to ensure your data is handled with the utmost care.
            </p>
            <h2 className="text-xl font-bold mb-4">Information We Collect:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-200">Personal Information: Name, email address, phone number, and other contact details.</li>
              <li className="text-gray-200">Portfolio Data: Information about your projects, skills, and achievements.</li>
              <li className="text-gray-200">Usage Data: Insights into how you interact with our platform and its features.</li>
            </ul>
            <h2 className="text-xl font-bold mb-4">How We Use Your Information:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-gray-200">To provide and enhance your portfolio experience.</li>
              <li className="text-gray-200">To keep you informed about updates and new features.</li>
              <li className="text-gray-200">To offer support and address any inquiries or issues.</li>
              <li className="text-gray-200">
                To analyze usage and gather insights to continually improve our platform.
              </li>
            </ul>
            <p className="text-gray-200 mb-6">
              <strong>Data Security:</strong> We employ industry-standard encryption methods to safeguard your personal and portfolio information.
            </p>
            <p className="text-gray-200 mb-6">
              <strong>Your Rights:</strong> You have the right to access, update, and delete your personal information. To exercise these rights, please contact us at{" "}
              <a href="mailto:support@createfolio.com" className="text-blue-500 hover:underline">
                support@createfolio.com
              </a>
              .
            </p>
            <p className="text-gray-200">
              For more details, please read our full{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>


          </div>
        </div>
      </div>

    </>
  )
}

export default PrivacyPolicy
