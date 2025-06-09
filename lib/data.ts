export type Technology = {
  name: string;
  icon: string; // The name of the icon from your chosen library
  category: 'machine-learning' | 'data-engineering' | 'analytics' | 'mlops' | 'cloud' | 'networking' | 'security' | 'observability' | 'automation';
};

export const technologies: Technology[] = [
  // Machine Learning
  { name: 'PyTorch', icon: 'fa-brain', category: 'machine-learning' }, // Using Font Awesome convention
  { name: 'Scikit-learn', icon: 'fa-robot', category: 'machine-learning' }, // Represents ML models
  
  // Data Engineering
  { name: 'Pandas', icon: 'fa-table', category: 'data-engineering' }, // Represents tabular data
  { name: 'NumPy', icon: 'fa-calculator', category: 'data-engineering' }, // Represents numerical computation
  { name: 'PostgreSQL', icon: 'fa-database', category: 'data-engineering' },
  
  // Analytics & Visualization
  { name: 'Tableau', icon: 'fa-chart-pie', category: 'analytics' },
  { name: 'Looker Studio', icon: 'fa-chart-line', category: 'analytics' },
  { name: 'Jupyter', icon: 'fa-book-open', category: 'analytics' }, // Represents notebooks
  
  // MLOps & Containerization
  { name: 'Github Actions', icon: 'fa-github-alt', category: 'mlops' }, // GitHub logo
  { name: 'Helm', icon: 'fa-ship', category: 'mlops' }, // Ship's wheel, often associated with Helm
  { name: 'Docker', icon: 'fa-docker', category: 'mlops' },
  { name: 'Kubernetes', icon: 'fa-cubes', category: 'mlops' }, // Represents orchestration/blocks
  { name: 'Rancher', icon: 'fa-cow', category: 'mlops' }, // Official Rancher mascot
  
  
  // Networking & Proxy
  { name: 'Nginx', icon: 'fa-server', category: 'networking' }, // Represents a web server/proxy
  { name: 'Traefik', icon: 'fa-exchange-alt', category: 'networking' }, // Represents traffic exchange
  { name: 'WireGuard', icon: 'fa-user-secret', category: 'networking' }, // Represents privacy/VPN
  
  // Observability
  { name: 'Grafana', icon: 'fa-chart-area', category: 'observability' }, // Represents dashboards/charts
  { name: 'Prometheus', icon: 'fa-fire', category: 'observability' }, // Represents alerts/monitoring flame
  
  // Security & Access Management
  { name: 'Cloudflare DNS', icon: 'fa-cloud', category: 'security' }, // Cloud with a lock
  { name: 'Cloudflare Zero Trust', icon: 'fa-lock', category: 'security' },
  { name: 'Google OAuth', icon: 'fa-key', category: 'security' }, // Represents authentication key
];
export type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageSrc: string;
  githubUrl?: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  outcomes: string[];
};



export const projects: Project[] = [
  {
    id: '1',
    title: 'CI/CD Pipeline with GitHub Actions',
    slug: 'ci-cd-pipeline',
    shortDescription: 'Automated deployment pipeline for a web application using GitHub Actions and Digital Ocean.',
    longDescription: 'Implemented a continuous integration and continuous deployment pipeline for a React application using GitHub Actions. The pipeline builds, tests, and deploys the application to Digital Ocean droplets whenever changes are pushed to the main branch.',
    technologies: ['GitHub Actions', 'traefik', 'Docker', 'Helm'],
    imageSrc: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/vishvesh11/ci-cd-pipeline',
    problem: 'The development team was manually deploying updates to the production environment, which was time-consuming and prone to human error.',
    solution: 'Designed and implemented an automated CI/CD pipeline using GitHub Actions that builds, tests, and deploys the application to Digital Ocean whenever changes are pushed to the main branch.',
    architecture: 'The pipeline consists of several stages: checkout, install dependencies, run tests, build Docker image, push to registry, and deploy to Digital Ocean droplets.',
    challenges: [
      'Ensuring zero-downtime deployments',
      'Configuring proper environment variables across different environments',
      'Optimizing build times to reduce pipeline duration'
    ],
    outcomes: [
      'Reduced deployment time from 45 minutes to 8 minutes',
      '99.9% uptime since implementation',
      'Eliminated manual deployment errors',
      'Improved developer productivity by 25%'
    ]
  },
  {
    id: '2',
    title: 'Self-Hosted Smart Home Infrastructure',
    slug: 'smart-home-infrastructure',
    shortDescription: 'Comprehensive smart home system with Home Assistant, custom automations, and monitoring.',
    longDescription: 'Designed and implemented a fully self-hosted smart home system based on Home Assistant, with custom automations, monitoring, and integration with various smart devices. The system runs on a Proxmox virtual environment with high availability and automated backups.',
    technologies: ['Proxmox', 'Home Assistant', 'MQTT', 'Grafana', 'Prometheus'],
    imageSrc: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/vishvesh11/self-hosting-guides',
    problem: 'Off-the-shelf smart home solutions lacked flexibility, had privacy concerns, and didn\'t offer the level of customization needed.',
    solution: 'Built a custom smart home infrastructure using open-source software running on self-hosted hardware, with comprehensive monitoring and automated failover.',
    architecture: 'The system is centered around Home Assistant running in a Docker container, with  for complex automations, an MQTT broker for device communication, and Grafana/Prometheus for monitoring.',
    challenges: [
      'Ensuring high availability with proper failover mechanisms',
      'Optimizing resource usage on limited hardware',
      'Implementing secure remote access without exposing services directly to the internet'
    ],
    outcomes: [
      'Achieved 99.8% system uptime over 12 months',
      'Reduced power consumption by 15% through smart automations',
      'Integrated 25+ IoT devices from different manufacturers into a single control interface',
      'Implemented automated backup system with 3-2-1 strategy'
    ]
  },
  {
    id: '3',
    title: 'Kubernetes Cluster for Homelab',
    slug: 'kubernetes-homelab',
    shortDescription: 'A multi-node Kubernetes cluster for hosting homelab services with automated monitoring.',
    longDescription: 'Designed and implemented a production-grade Kubernetes cluster for homelab use, including high availability, persistent storage, automated monitoring, and GitOps-based deployment.',
    technologies: ['Kubernetes', 'Prometheus', 'Grafana', 'Helm'],
    imageSrc: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/vishvesh11/k8s-homelab',
    problem: 'Managing multiple Docker containers across different machines was becoming complex and difficult to maintain.',
    solution: 'Implemented a Kubernetes cluster to centralize management, improve scalability, and enable automated deployments of homelab services.',
    architecture: 'The cluster consists of three control plane nodes and five worker nodes, with Longhorn for distributed storage, MetalLB for load balancing, and Cert-Manager for TLS certificates.',
    challenges: [
      'Designing a proper network architecture',
      'Implementing persistent storage for stateful applications',
      'Ensuring high availability with proper resource allocation'
    ],
    outcomes: [
      'Reduced service deployment time from hours to minutes',
      'Improved resource utilization by 40%',
      'Achieved 99.95% uptime for critical services',
      'Simplified management of 20+ applications'
    ]
  },
  {
    id: '4',
    title: 'City Traffic Dashboard',
    slug: 'realtime-analytics-dashboard',
    shortDescription: 'A dynamic and interactive Dash application designed for exploratory data analysis (EDA) of futuristic city traffic data',
    longDescription: 'This dashboard offers comprehensive insights through the following interactive visualizations Interactive Filters, Speed vs. Traffic Density Scatter Plot, Average Energy Consumption by Economic Condition, etc.',
    technologies: ['Dash (plotly', 'Pandas', 'Gunicorn',],
    imageSrc: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/vishvesh11/network-security',
    problem: 'Lack of visibility into city traffic',
    solution: 'A dynamic and interactive Dash application designed for exploratory data analysis (EDA) of futuristic city traffic data. The dashboard provides insights into various aspects of urban mobility, including speed, traffic density, energy consumption, and their correlations with factors like economic condition, weather, and day of the week.',
    architecture: 'The application is containerized using Docker and deployed on a Kubernetes cluster, demonstrating a robust and scalable hybrid cloud deployment strategy.',
    challenges: [
      'Handling the large volume of data and managing it efficiently',
      'Configuring Kuberneties to ensuer CI-CD pipeline',
      'Ensuering auto Issuance of SSL certificate from Lets-encrypt'
    ],
    outcomes: [
      'An interactive dashboard with all the relavent data displayed entuitively',
      'Gained comprehensive understanding of Github Actions and Kuberneties',
      'Identified and remediated previously unknown security vulnerabilities'
    ]
  },
  {
    id: '5',
    title: 'Machine Learning Model Deployment Pipeline',
    slug: 'ml-deployment-pipeline',
    shortDescription: 'End-to-end MLOps pipeline for model training, validation, and deployment using Kubeflow.',
    longDescription: 'Built a comprehensive MLOps pipeline that automates the entire machine learning lifecycle from data ingestion to model deployment, including automated retraining and monitoring.',
    technologies: ['Kubeflow', 'MLflow', 'TensorFlow', 'Docker', 'Kubernetes', 'Prometheus'],
    imageSrc: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/vishvesh11/ml-pipeline',
    problem: 'Manual model deployment process was slow, error-prone, and lacked proper monitoring and versioning.',
    solution: 'Implemented an automated MLOps pipeline using Kubeflow for orchestration, MLflow for experiment tracking, and Kubernetes for scalable deployment.',
    architecture: 'The pipeline includes data validation, model training, hyperparameter tuning, model validation, deployment, and monitoring components all orchestrated through Kubeflow.',
    challenges: [
      'Integrating multiple ML tools into a cohesive pipeline',
      'Implementing proper model versioning and rollback mechanisms',
      'Setting up comprehensive monitoring for model performance drift'
    ],
    outcomes: [
      'Reduced model deployment time from weeks to hours',
      'Implemented automated model retraining based on performance metrics',
      'Achieved 99.5% model availability with automated failover',
      'Improved model accuracy by 15% through systematic experimentation'
    ]
  },
  {
    id: '6',
    title: 'Real-time Data Analytics Dashboard',
    slug: 'realtime-analytics-dashboard',
    shortDescription: 'Real-time analytics platform processing streaming data with Apache Kafka and Apache Spark.',
    longDescription: 'Developed a real-time analytics platform that processes streaming data from multiple sources, performs real-time analysis, and presents insights through interactive dashboards.',
    technologies: ['Apache Kafka', 'Apache Spark', 'Elasticsearch', 'Kibana', 'Python', 'Docker'],
    imageSrc: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/vishvesh11/realtime-analytics',
    liveUrl: 'https://analytics-demo.example.com',
    problem: 'Business needed real-time insights from multiple data sources but existing batch processing was too slow for decision-making.',
    solution: 'Built a streaming analytics platform using Kafka for data ingestion, Spark for real-time processing, and Elasticsearch/Kibana for visualization.',
    architecture: 'Data flows from multiple sources into Kafka topics, Spark Streaming processes the data in real-time, results are stored in Elasticsearch, and Kibana provides interactive dashboards.',
    challenges: [
      'Handling high-volume streaming data without data loss',
      'Implementing complex event processing for real-time analytics',
      'Ensuring low-latency processing while maintaining data accuracy'
    ],
    outcomes: [
      'Reduced time-to-insight from hours to seconds',
      'Processed over 1 million events per minute with sub-second latency',
      'Enabled real-time decision making for business operations',
      'Improved operational efficiency by 30% through real-time monitoring'
    ]
  }
];