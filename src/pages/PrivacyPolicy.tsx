import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <div className={`${styles.paddingX} py-16 max-w-4xl mx-auto`}>
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#915eff] hover:text-white transition-colors mb-10 text-[14px]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to portfolio
        </button>

        <h1 className={`${styles.sectionHeadText} mb-2`}>Privacy Policy</h1>
        <p className="text-[#aaa6c3] text-[14px] mb-10">
          Last updated: April 17, 2026
        </p>

        <div className="space-y-10 text-[#aaa6c3] text-[15px] leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              1. Who We Are
            </h2>
            <p>
              This website is the personal portfolio of{" "}
              <span className="text-white">Ife Obijiofor</span>, a Senior
              Fullstack Engineer. The site is accessible at{" "}
              <span className="text-[#915eff]">
                https://ifesportfolio.vercel.app
              </span>{" "}
              (or equivalent domain).
            </p>
            <p className="mt-2">
              For privacy enquiries, contact:{" "}
              <a
                href="mailto:ifeobijiofor1@gmail.com"
                className="text-[#915eff] underline hover:text-white transition-colors"
              >
                ifeobijiofor1@gmail.com
              </a>
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              2. What Data We Collect and Why
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-[#2a2a6a]">
                    <th className="text-left py-2 pr-6 text-white font-medium">
                      Data
                    </th>
                    <th className="text-left py-2 pr-6 text-white font-medium">
                      Purpose
                    </th>
                    <th className="text-left py-2 text-white font-medium">
                      Legal basis (GDPR)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a4a]">
                  <tr>
                    <td className="py-3 pr-6">
                      IP address, browser, device, pages visited
                    </td>
                    <td className="py-3 pr-6">
                      Website analytics (Google Analytics)
                    </td>
                    <td className="py-3">Consent (Art. 6(1)(a))</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Name, email, message</td>
                    <td className="py-3 pr-6">
                      Responding to contact form enquiries
                    </td>
                    <td className="py-3">
                      Legitimate interests (Art. 6(1)(f))
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Cookie consent preference</td>
                    <td className="py-3 pr-6">
                      Remembering your cookie choice
                    </td>
                    <td className="py-3">Legitimate interests (Art. 6(1)(f))</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              3. Cookies
            </h2>
            <p>
              This site uses cookies only with your consent. We use{" "}
              <span className="text-white">Google Analytics</span> (a service
              provided by Google LLC) to understand how visitors interact with
              this site — for example, which sections are most visited.
            </p>
            <p className="mt-3">
              Google Analytics sets cookies that track your session anonymously.
              No personally identifiable information is sent to Google unless
              you choose to submit the contact form.
            </p>
            <p className="mt-3">
              You may withdraw your consent at any time by clearing your browser
              cookies or by contacting us.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              4. Third-Party Services
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-white">Google Analytics</span> — analytics
                tracking. Google's privacy policy:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#915eff] underline hover:text-white transition-colors"
                >
                  policies.google.com/privacy
                </a>
              </li>
              <li>
                <span className="text-white">Google Ads</span> — advertising to
                reach potential clients. Subject to Google's ad policies.
              </li>
              <li>
                <span className="text-white">EmailJS / contact form</span> — if
                you submit the contact form, your name, email, and message are
                sent to my inbox only.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              5. Data Transfers
            </h2>
            <p>
              Google Analytics may transfer data to servers in the United
              States. Google is certified under the EU–US Data Privacy
              Framework, providing adequate safeguards for such transfers.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              6. Data Retention
            </h2>
            <p>
              Analytics data is retained for 14 months (Google Analytics
              default). Contact form messages are retained only as long as
              needed to respond to your enquiry.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              7. Your Rights (GDPR / UK GDPR)
            </h2>
            <p>If you are in the EU or UK, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access the personal data held about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Withdraw consent at any time (for consent-based processing)</li>
              <li>
                Lodge a complaint with your local supervisory authority (e.g.
                ICO in the UK, your national DPA in the EU)
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a
                href="mailto:ifeobijiofor1@gmail.com"
                className="text-[#915eff] underline hover:text-white transition-colors"
              >
                ifeobijiofor1@gmail.com
              </a>
              .
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              8. California Residents (CCPA)
            </h2>
            <p>
              If you are a California resident, you have the right to know what
              personal information is collected, to request deletion, and to
              opt out of the sale of personal information. We do not sell
              personal information. To submit a request, contact{" "}
              <a
                href="mailto:ifeobijiofor1@gmail.com"
                className="text-[#915eff] underline hover:text-white transition-colors"
              >
                ifeobijiofor1@gmail.com
              </a>
              .
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-white text-[20px] font-semibold mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              This policy may be updated from time to time. The "Last updated"
              date at the top of this page reflects the most recent revision.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
