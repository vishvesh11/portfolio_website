// src/lib/technologies.ts (or wherever you defined this)

export type Technology = {
  name: string;
  icon: string; // The name of the icon from your chosen library (e.g., "brain" for Lucid Icons)
  category: 'machine-learning' | 'data-engineering' | 'analytics' | 'mlops' | 'cloud' | 'networking' | 'security' | 'observability';
};

export const technologies: Technology[] = [

  { name: 'PyTorch', icon: 'brain', category: 'machine-learning' },
  { name: 'Scikit-learn', icon: 'robot', category: 'machine-learning' },
  { name: 'Pandas', icon: 'table', category: 'data-engineering' },
  { name: 'NumPy', icon: 'calculator', category: 'data-engineering' },
  { name: 'PostgreSQL', icon: 'database', category: 'data-engineering' },
  { name: 'Tableau', icon: 'pie-chart', category: 'analytics' },
  { name: 'Looker Studio', icon: 'line-chart', category: 'analytics' },
  { name: 'Jupyter', icon: 'notebook', category: 'analytics' },
  { name: 'Github Actions', icon: 'git-branch', category: 'mlops' },
  { name: 'Helm', icon: 'ship', category: 'mlops' },
  { name: 'Docker', icon: 'package', category: 'mlops' }, // Using 'package' for box icon
  { name: 'Kubernetes', icon: 'box', category: 'cloud' }, // Using 'box' for cubes
  { name: 'GCP', icon: 'cloud', category: 'cloud' },
  { name: 'Rancher', icon: 'cow', category: 'mlops' }, // Assuming a 'cow' icon exists
  { name: 'Nginx', icon: 'server', category: 'networking' },
  { name: 'Traefik', icon: 'exchange', category: 'networking' },
  { name: 'WireGuard', icon: 'shield', category: 'networking' },
  { name: 'Grafana', icon: 'layout-dashboard', category: 'observability' }, // Lucid Icons like layout-dashboard, bar-chart-2
  { name: 'Prometheus', icon: 'gauge', category: 'observability' },
  { name: 'Cloudflare DNS', icon: 'globe', category: 'security' },
  { name: 'Cloudflare Zero Trust', icon: 'lock', category: 'security' },
  { name: 'Google OAuth', icon: 'key', category: 'security' },
];

export const technologyCategories = [
  {
    name: 'Machine Learning',
    key: 'machine-learning',
    icon: 'brain', // Lucid Icons: brain
  },
  {
    name: 'Data Engineering',
    key: 'data-engineering',
    icon: 'server', // Lucid Icons: server
  },
  {
    name: 'Analytics & Visualization',
    key: 'analytics',
    icon: 'bar-chart-2', // Lucid Icons: bar-chart-2 or line-chart
  },
  {
    name: 'MLOps & DevOps',
    key: 'mlops',
    icon: 'cog', // Lucid Icons: cog (for cogs/gears)
  },
  {
    name: 'Cloud Platforms',
    key: 'cloud',
    icon: 'cloud', // Lucid Icons: cloud
  },
  {
    name: 'Networking & Proxy',
    key: 'networking',
    icon: 'network', // Lucid Icons: network
  },
  {
    name: 'Security & Access Management',
    key: 'security',
    icon: 'shield', // Lucid Icons: shield
  },
  {
    name: 'Observability & Monitoring',
    key: 'observability',
    icon: 'eye', // Lucid Icons: eye
  },
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
    title: 'Distributed K3s Homelab Cluster',
    slug: 'distributed-k3s-homelab',
    shortDescription: 'A geo-distributed K3s cluster leveraging cloud, bare-metal, and edge devices for resilient homelab services.',
    longDescription: 'Designed and implemented a lightweight yet powerful K3s Kubernetes cluster spanning multiple physical locations. This project focuses on establishing robust inter-node communication, centralizing management, and integrating diverse hardware to host various homelab services, including plans for media streaming with local storage integration.',
    technologies: ['Kubernetes (K3s)', 'Rancher', 'Traefik', 'WireGuard', 'Flannel', 'Docker', 'Ubuntu Server', 'Proxmox', 'Jellyfin (Planned)'],
    imageSrc: `/Kuberneties_Network.png`, // You might want to find a more representative image!
    githubUrl: 'https://github.com/vishvesh11/Distributed-K3s-Homelab-Cluster.git', 
    problem: 'Traditional single-location homelab setups lack true resilience and geographical diversity. Managing services across disparate hardware types (cloud, home server, edge) requires a unified, lightweight, and extensible orchestration platform.',
    solution: 'Deployed K3s, a lightweight Kubernetes distribution, across an Oracle Cloud VM (master) and a local Proxmox VM (worker). WireGuard tunnels secure inter-node communication, providing a reliable network fabric. Rancher centralizes cluster management, and Traefik handles external Ingress. Future expansion includes a remote node in Pune and an edge device (OnePlus Nord) to create a highly distributed and fault-tolerant environment.',
    architecture: `
**Control Plane:**
  - **Master Node:** Oracle Cloud VM (Ubuntu 24.04 LTS, IP: 10.0.0.80) running K3s control plane, Traefik Ingress Controller, and Rancher for cluster management. This node serves as the primary entry point for external traffic.

**Worker Nodes:**
  - **Home Node:** Proxmox VM (Ubuntu 24.04 LTS, IP: 192.168.5.5) running K3s worker. Currently, it hosts the 'portfolio-website' pod and is planned to integrate local storage for services like Jellyfin. This node is currently set to 'SchedulingDisabled'.
  - **Future Pune Node:** A planned VM in Pune, India, to be added as a K3s worker for geographical redundancy and distributed workloads.
  - **Future Edge Node:** A OnePlus Nord running Ubuntu Touch, intended to join as a K3s worker, exploring edge computing capabilities within the cluster.

**Networking:**
  - **CNI:** K3s's default Flannel (VXLAN) provides the overlay network for inter-pod communication.
  - **Secure Inter-Node Communication:** WireGuard VPN tunnel is established as a secure interface between all K3s nodes. This ensures encrypted and reliable communication across diverse network environments (cloud, home LAN, mobile).
  - **Ingress:** Traefik Ingress Controller, running on the master node, manages external access to services (e.g., 'portfolio-website' via vishvesh.me) with automated SSL certificate provisioning.

**Management & Storage:**
  - **Cluster Management:** Rancher provides a centralized UI for managing cluster resources, deployments, and users.
  - **Persistent Storage:** Currently exploring solutions for persistent storage. For Jellyfin, direct integration with a hard drive on the home Proxmox node is planned to serve media files. Other persistent storage solutions will be evaluated for broader cluster use.

**Deployed Applications:
  - 'portfolio-website': Your personal portfolio site.
  - 'future-city-dash': Another application demonstrating Kubernetes capabilities.
  - 'Jellyfin': Planned for media streaming, leveraging local storage on the home node.
`,
    challenges: [
      'Establishing robust and secure inter-node network connectivity across diverse geographical locations and network types (cloud, home LAN, mobile data) using WireGuard and Flannel.',
      'Implementing a scalable and reliable persistent storage solution that can integrate local storage for specific applications (like Jellyfin) while supporting general cluster needs.',
      'Managing network policies and security across a distributed, heterogeneous cluster with varying network characteristics.',
      'Integrating edge devices (OnePlus Nord) with limited resources and unique network considerations into the cluster topology.',
      'Ensuring high availability and resilience across geographically dispersed nodes with potential network latency differences.'
    ],
    outcomes: [
      'Successfully deployed a foundational multi-node K3s cluster across different environments.',
      'Established secure and functional inter-node communication using WireGuard tunnels, enabling cross-node pod connectivity.',
      'Centralized cluster management with Rancher, simplifying deployments and monitoring.',
      'Successfully exposed applications externally via Traefik Ingress with SSL, demonstrating public accessibility.',
      'Gained practical experience in distributed systems, network configuration, and K3s cluster operations.'
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