import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-10 w-10 text-yellow-600" />
        <div>
          <h1 className="text-3xl font-bold">Investment Risk Disclaimer</h1>
          <p className="text-gray-600">Please read carefully before using this platform</p>
        </div>
      </div>

      <Card className="bg-yellow-50 border-yellow-300">
        <CardContent className="p-6">
          <p className="font-semibold text-lg text-gray-900">
            ⚠️ This Platform Does NOT Provide Financial Advice
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            The information provided by this AI-powered investment advisor platform (the "Service") is for general informational and educational purposes only. All content, including AI-generated signals, analysis, recommendations, and projections, is provided "as is" without warranty of any kind.
          </p>
          <p>
            <strong>This is NOT financial, investment, or legal advice.</strong> We are not registered investment advisors, financial planners, or broker-dealers. The Service is a software tool that aggregates data and applies machine learning models to generate probabilistic predictions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Risks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p className="font-semibold">All investments carry risk. You may lose some or all of your invested capital.</p>

          <div className="space-y-2">
            <p><strong>Public Markets (Stocks, ETFs, Bonds):</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Stock prices can be volatile and unpredictable</li>
              <li>Past performance does not guarantee future results</li>
              <li>Market crashes can result in significant losses</li>
              <li>Dividend payments are not guaranteed</li>
              <li>Currency fluctuations can affect international investments</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><strong>Crowdfunding & Early-Stage Investments:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Extremely high risk - most startups fail</li>
              <li>Illiquid - typically cannot sell for 5-10 years</li>
              <li>Total loss of capital is common</li>
              <li>No guarantee of exit (IPO or acquisition)</li>
              <li>Dilution risk from future funding rounds</li>
              <li>Regulatory and legal risks</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><strong>African Markets (NSE, etc.):</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Political and economic instability risks</li>
              <li>Currency devaluation risk</li>
              <li>Lower liquidity than developed markets</li>
              <li>Regulatory changes and capital controls</li>
              <li>Limited investor protections</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Model Limitations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Our AI models (Amazon Bedrock Claude, SageMaker LSTM, Amazon Forecast, AWS Comprehend) are probabilistic systems trained on historical data. They have significant limitations:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No guarantee of accuracy:</strong> AI predictions can be wrong. Confidence scores are estimates, not certainties.</li>
            <li><strong>Historical bias:</strong> Models learn from past data, which may not repeat in the future.</li>
            <li><strong>Black swan events:</strong> Models cannot predict rare, unprecedented events (pandemics, wars, financial crises).</li>
            <li><strong>Data quality:</strong> Predictions are only as good as the input data, which may contain errors or biases.</li>
            <li><strong>Market manipulation:</strong> AI cannot detect fraud, market manipulation, or insider trading.</li>
            <li><strong>Overfitting:</strong> Models may appear accurate in backtesting but fail in real-world conditions.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>No Liability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            To the maximum extent permitted by law, we disclaim all liability for any losses, damages, or financial harm arising from:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use or reliance on AI signals, recommendations, or analysis</li>
            <li>Errors, omissions, or inaccuracies in data or predictions</li>
            <li>Technical failures, downtime, or service interruptions</li>
            <li>Third-party data sources or crowdfunding platforms</li>
            <li>Changes in laws, regulations, or market conditions</li>
          </ul>
          <p className="mt-4">
            <strong>You are solely responsible for all investment decisions.</strong> Do not invest money you cannot afford to lose.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Advice Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Before making any investment decisions, you should:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Consult with a qualified, registered financial advisor</li>
            <li>Conduct your own independent research and due diligence</li>
            <li>Read all prospectuses, offering documents, and disclosures</li>
            <li>Understand your personal risk tolerance and financial situation</li>
            <li>Consider tax implications (consult a tax professional)</li>
            <li>Only invest what you can afford to lose</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regulatory Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            This platform is not registered with the UK Financial Conduct Authority (FCA), US Securities and Exchange Commission (SEC), Kenya Capital Markets Authority (CMA), or any other financial regulator. We do not:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide personalized investment advice</li>
            <li>Execute trades or hold customer assets</li>
            <li>Offer securities, funds, or financial products</li>
            <li>Act as a broker-dealer, RIA, or financial intermediary</li>
          </ul>
          <p className="mt-4">
            You are responsible for ensuring your use of this platform complies with all applicable laws and regulations in your jurisdiction.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forward-Looking Statements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            This platform contains forward-looking statements, projections, and estimates (e.g., "Expected Return: 250%", "Target Price: £1,050"). These are speculative predictions based on AI models and assumptions. Actual results will likely differ materially.
          </p>
          <p>
            <strong>No guarantee of achieving the £10,000 → £100,000 goal.</strong> This is an aspirational target used for illustrative purposes. Most investors will not achieve 10x returns, especially within one year.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-300">
        <CardContent className="p-6">
          <p className="font-semibold text-red-900">
            By using this platform, you acknowledge that you have read, understood, and agree to this disclaimer. You accept full responsibility for all investment decisions and any resulting losses.
          </p>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 text-center py-4">
        Last Updated: December 30, 2025
      </div>
    </div>
  )
}
