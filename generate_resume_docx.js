const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  LevelFormat,
} = require("docx");

const output = "/Users/dzung/profile/nguyen-tri-dung-cto-resume.docx";

const bulletRef = "resume-bullets";

function para(text, opts = {}) {
  return new Paragraph({
    ...opts,
    children: [new TextRun({ text })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: bulletRef, level },
    spacing: { after: 80 },
    children: [new TextRun({ text })],
  });
}

function section(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: title })],
  });
}

function subSection(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text: title })],
  });
}

function roleLine(role, company, locationYears) {
  return [
    new Paragraph({
      spacing: { before: 120, after: 40 },
      children: [new TextRun({ text: role, bold: true })],
    }),
    para(company, { spacing: { after: 20 } }),
    para(locationYears, { spacing: { after: 80 } }),
  ];
}

const children = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "NGUYEN TRI DUNG", bold: true, size: 36 })],
    spacing: { after: 80 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Chief Technology Officer | Technical Founder | Applied AI, Generative AI, AI Agent Systems",
        bold: true,
        size: 22,
      }),
    ],
    spacing: { after: 160 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Location: Vietnam | Email: [add current email] | Phone: [add current phone] | LinkedIn / Website: [add if needed]" })],
    spacing: { after: 220 },
  }),

  section("Professional Summary"),
  para("Technology executive and technical founder with experience across software engineering, real-time systems, AI product development, computer vision, engineering organization building, and, more recently, Generative AI and AI Agents. Built from a hands-on engineering background in web systems, game engineering, and large-scale technology products in Japan, then expanded into CTO leadership across applied AI, OCR/eKYC, facial recognition, IoT/smart building, and AI-native software engineering.", {
    spacing: { after: 120 },
  }),
  para("Strong track record in building engineering teams, defining technical direction, and turning emerging technologies into deployable products with operational value. Recent work has focused on open-source LLMs, Coding Agents, LangChain, LangGraph, LlamaIndex, Google AI SDK, reverse engineering from legacy source to structured documentation, and building teams and products around AI Agent capabilities.", {
    spacing: { after: 160 },
  }),

  section("Executive Highlights"),
  bullet("Co-founded and led technology direction for Fabbi, helping scale the engineering organization from the founding stage to more than 250 engineers by 2021 profile materials."),
  bullet("Helped build the company to approximately $4M in annual revenue by 2021 profile materials while establishing engineering capability and delivery quality."),
  bullet("Built and led applied AI initiatives across chatbot, OCR, eKYC, facial recognition, and smart building solutions."),
  bullet("Directed Fvision, an AI/computer-vision product recognized with Sao Khue 2021."),
  bullet("Worked in Japan across product engineering, real-time systems, network optimization, and large-scale search systems at Kayac and DeNA."),
  bullet("From 2024 onward, expanded focus into Generative AI, open-source LLM, AI Agents, and AI-native software engineering workflows."),

  section("Core Competencies"),
  bullet("Technology strategy and engineering leadership"),
  bullet("Applied AI and Generative AI product development"),
  bullet("LLM application architecture and AI Agent systems"),
  bullet("Coding Agent workflow design and AI for software engineering"),
  bullet("Reverse engineering and legacy modernization"),
  bullet("Computer vision, OCR, eKYC, facial recognition"),
  bullet("Real-time systems and performance optimization"),
  bullet("Cloud-native architecture and scalable backend platforms"),
  bullet("Cross-functional product execution"),
  bullet("Engineering organization design, hiring, mentoring, and delivery management"),
  bullet("Vietnam-Japan cross-border technology delivery"),

  section("Professional Experience"),
  ...roleLine(
    "Co-founder & CTO, Fabbi JSC | CEO, Fabbi AI | CTO, Fabbi Japan",
    "Fabbi JSC / Fabbi AI / Fabbi Japan",
    "Vietnam / Japan | 2018 - Present"
  ),
  bullet("Co-founded Fabbi and led technology strategy, architecture direction, and engineering execution from the founding stage."),
  bullet("Built and scaled the engineering organization, including team structure, development process, and software quality practices; supported growth to more than 250 engineers by 2021 profile materials."),
  bullet("Helped establish the company’s technical delivery capability for enterprise clients in Vietnam and Japan, including TV Tokyo, Sony Music Japan, AIC Vietnam, and Thien Minh Group according to profile materials."),
  bullet("Directed applied AI initiatives including Vietnamese chatbot systems, OCR, eKYC, facial recognition, and smart building solutions."),
  bullet("Led Fvision, an AI/computer-vision product combining identity verification, anti-spoofing, access control, and contactless temperature screening; recognized with Sao Khue 2021."),
  bullet("Worked across software architecture, AI systems, cloud platforms, hardware-integrated deployment, production constraints, security, and operating cost."),
  bullet("Since 2024, expanded the technology roadmap into Generative AI, open-source LLM, AI Agents, and AI-native software engineering workflows."),
  bullet("Applied frameworks including LangChain, LangGraph, LlamaIndex, and Google AI SDK to coding-agent, reverse-engineering, and agent-product initiatives."),
  bullet("Recognized by VnExpress in the Top 20 Young Technology Leaders 2021."),

  ...roleLine(
    "Senior Engineer / Technical Lead, Search and Large-Scale Systems",
    "DeNA",
    "Tokyo, Japan | Approx. 2014 - 2018"
  ),
  bullet("Worked on optimization initiatives for large-scale search systems inside DeNA group products."),
  bullet("Focused on performance, relevance, scalability, and engineering quality for production-scale platforms."),
  bullet("Expanded technical scope beyond game engineering into large-scale backend, platform, and search-oriented systems."),
  bullet("Strengthened experience in high-standard product execution for large consumer platforms."),

  ...roleLine(
    "Software Engineer / Project Manager, Game Engineering",
    "Kayac",
    "Tokyo, Japan | Approx. 2012 - 2014"
  ),
  bullet("Built mobile and real-time game products with Unity3D."),
  bullet("Worked across gameplay systems, AI for games, level design, optimization, testing, and release management."),
  bullet("Tackled network optimization and real-time PvP challenges, including lag mitigation and peer-to-peer considerations."),
  bullet("Developed a strong foundation in product engineering under commercial delivery constraints."),
  bullet("Selected projects: Tap Ninja 2; Garita Quest for Fuji Television; Bashland."),

  section("Selected Projects"),
  subSection("Fvision"),
  para("Applied AI / Computer Vision / Smart Building", { spacing: { after: 40 } }),
  bullet("End-to-end solution combining facial recognition, identity verification, anti-spoofing, access management, and contactless temperature screening."),
  bullet("Integrated RGB camera, thermal camera, machine learning, sensor inputs, and practical deployment constraints."),
  bullet("Balanced accuracy, hardware compatibility, latency, operating cost, scalability, and enterprise security requirements."),
  bullet("Recognized with Sao Khue 2021."),

  subSection("Fabbi AI Core Initiatives"),
  para("Applied AI Platform Development", { spacing: { after: 40 } }),
  bullet("Helped drive development of AI capabilities including Vietnamese chatbot systems, OCR, and eKYC."),
  bullet("Focused on practical productization of AI rather than research in isolation."),
  bullet("Worked on the intersection of model capability, infrastructure, deployment, and business usability."),

  subSection("TV Tokyo / txbiz (テレ東BIZ)"),
  para("Live Streaming Platform | Video Management | Website and App Ecosystem", { spacing: { after: 40 } }),
  bullet("Built txbiz for TV Tokyo from an early stage as a long-running platform initiative covering live streaming, video management, website delivery, and app ecosystem integration."),
  bullet("Helped design the platform from the ground up, including microservice architecture and core delivery approach."),
  bullet("Worked in an Agile / Scrum model and took on team leadership from the early execution phase."),
  bullet("Contributed to a production platform for a major Japanese broadcaster, with strong requirements around reliability, content operations, and coordination across multiple product surfaces."),

  subSection("Generative AI and Coding Agent Initiatives"),
  para("AI-Native Software Engineering | 2024 - Present", { spacing: { after: 40 } }),
  bullet("Researched open-source LLM ecosystems and foundational Generative AI building blocks."),
  bullet("Evaluated and applied frameworks such as LangChain, LangGraph, LlamaIndex, and Google AI SDK."),
  bullet("Explored Coding Agent patterns for engineering productivity and software development lifecycle acceleration."),
  bullet("Worked on reverse engineering and transforming legacy source code into structured documentation and reusable engineering knowledge."),
  bullet("Built project direction and team capability for products that leverage AI Agent architectures."),

  section("Awards and Recognition"),
  bullet("Top 20 Young Technology Leaders 2021, VnExpress"),
  bullet("Sao Khue 2021 recognition for Fvision"),
  bullet("Fvision featured in public technology and media exposure including Vietnam Expo 2021 and television coverage, according to profile materials"),

  section("Education"),
  para("University of Engineering and Technology, Vietnam National University, Hanoi", { spacing: { after: 40 } }),
  para("Engineer in Information Technology | Graduated 2012", { spacing: { after: 120 } }),

  section("Certifications"),
  bullet("IBM Certified Solution Designer (2011)"),
  bullet("Summer Creativity - Open Source Application Competition (2011)"),

  section("Selected Technologies"),
  subSection("AI / Generative AI"),
  bullet("Applied AI, Machine Learning / Deep Learning, Computer Vision"),
  bullet("OCR / eKYC / Facial Recognition"),
  bullet("Open-source LLMs, AI Agents, Coding Agents"),
  bullet("Tokenization concepts, GAN fundamentals"),
  subSection("Frameworks / Platforms"),
  bullet("LangChain, LangGraph, LlamaIndex, Google AI SDK"),
  bullet("TensorFlow, Keras, scikit-learn, NumPy, Matplotlib"),
  subSection("Engineering / Architecture"),
  bullet("Cloud-native systems, Microservices, Scalable backend architecture"),
  bullet("API and service design, Delivery processes and engineering standards"),
  bullet("Reverse engineering and legacy modernization"),
  subSection("Infrastructure / Tools"),
  bullet("AWS, GCP, Docker, Kubernetes, GitLab CI/CD"),
  bullet("Elasticsearch / Kibana / Logstash, Redis, RabbitMQ, MQTT, gRPC"),
  bullet("Linux / Ubuntu"),
  subSection("Programming"),
  bullet("Python, JavaScript / Node.js, Java, C#, C++, PHP, Objective-C"),
];

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Arial",
          size: 20,
        },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 220, after: 120 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 22, bold: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 140, after: 60 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: bulletRef,
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 300 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 900, right: 900, bottom: 900, left: 900 },
        },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(output, buffer);
  console.log(output);
});
