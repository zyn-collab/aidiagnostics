export type ModelTier = 'active' | 'hospital' | 'coming_soon'
export type ComputeType = 'cpu' | 'gpu'

export interface ModelCondition {
  name: string
  description?: string
}

export interface ModelPerformance {
  metric: string
  value: string
  dataset: string
}

export interface ModelInfo {
  slug: string
  name: string
  tagline: string
  tier: ModelTier
  tierLabel: string
  description: string
  longDescription: string
  whatItCanDetect: string
  whoShouldUse: string
  inputDescription: string
  inputFormats: string[]
  acceptedExtensions: string[]
  maxFileSizeMB: number
  conditions: ModelCondition[]
  performance: ModelPerformance[]
  confidenceStatement: string
  outputDescription: string
  limitations: string[]
  paperTitle?: string
  paperJournal?: string
  paperUrl?: string
  institution?: string
  computeType: ComputeType
  costPerRun: number
  estimatedTime: string
  whyNotAvailable?: string
  ctaText: string
  ctaHref: string
}

export const MODELS: ModelInfo[] = [
  // ── Tier A: Active ──────────────────────────────────
  {
    slug: 'pillar0',
    name: 'Pillar-0',
    tagline: 'One scan, hundreds of findings',
    tier: 'active',
    tierLabel: 'Analyze Now',
    description: 'Upload a single CT or MRI scan and get a comprehensive screening across 350+ possible conditions — the kinds of things a radiologist would look for, analyzed in about one minute.',
    longDescription: 'Pillar-0 is a general-purpose radiology AI that screens a single CT or MRI scan across more than 350 possible findings. It covers chest CT (lung nodules, pleural effusion, emphysema, lymphadenopathy, coronary calcification, and hundreds more), abdomen CT (liver lesions, kidney stones, gallstones, aneurysms, organ abnormalities), brain CT (hemorrhage, mass effect, midline shift, hydrocephalus, fractures), and breast MRI findings. Think of it as an AI radiologist that checks everything at once.',
    whatItCanDetect: 'Covers 350+ findings across chest, abdomen, brain, and breast imaging. Includes lung nodules, pleural effusion, emphysema, coronary calcification, liver lesions, kidney stones, gallstones, hemorrhage, fractures, and hundreds more.',
    whoShouldUse: 'Radiologists, emergency physicians, and any doctor who orders CT or MRI scans. Especially useful as a comprehensive second-opinion screening tool.',
    inputDescription: 'CT scan (DICOM folder) or MRI (DICOM or NIfTI)',
    inputFormats: ['DICOM folder', 'NIfTI (.nii, .nii.gz)'],
    acceptedExtensions: ['.dcm', '.nii', '.nii.gz', '.zip'],
    maxFileSizeMB: 500,
    conditions: [
      { name: 'Lung nodules' }, { name: 'Pleural effusion' }, { name: 'Emphysema' },
      { name: 'Lymphadenopathy' }, { name: 'Coronary calcification' }, { name: 'Liver lesions' },
      { name: 'Kidney stones' }, { name: 'Gallstones' }, { name: 'Aneurysms' },
      { name: 'Hemorrhage' }, { name: 'Mass effect' }, { name: 'Hydrocephalus' },
      { name: 'Fractures' }, { name: '+ 337 more findings' },
    ],
    performance: [
      { metric: 'Accuracy', value: '87%', dataset: 'across 350+ findings' },
    ],
    confidenceStatement: 'This model was developed at UC Berkeley and UCSF and achieves 87% accuracy across 350+ findings, outperforming models by Google, Microsoft, and Alibaba. However, it is a screening tool — it flags areas for a radiologist to investigate, not a replacement for radiologist interpretation. Some findings will be false positives and some may be missed.',
    outputDescription: 'A sorted list of findings grouped by body region, each with a probability score. Rendered as a categorized list with color-coded confidence bars.',
    limitations: [
      'Screening tool only — flags areas for investigation, not a final diagnosis',
      'Some findings will be false positives; some may be missed',
      'Requires standard DICOM or NIfTI format from a CT or MRI scanner',
      'Processing requires GPU — subject to daily compute limits',
    ],
    paperJournal: 'UC Berkeley / UCSF',
    institution: 'UC Berkeley & UCSF',
    computeType: 'gpu',
    costPerRun: 0.20,
    estimatedTime: '~1 minute',
    ctaText: 'Upload and analyze',
    ctaHref: '/analyze/pillar0',
  },
  {
    slug: 'sybil',
    name: 'Sybil',
    tagline: 'Six-year lung cancer risk from one CT scan',
    tier: 'active',
    tierLabel: 'Analyze Now',
    description: 'Upload a chest CT scan and get a personalized prediction of your risk of developing lung cancer over the next 1 to 6 years.',
    longDescription: 'Sybil looks at the entire chest CT scan — not just visible nodules — to find subtle patterns that predict future cancer development, sometimes years before it would be visible to a human eye. This is not detecting existing cancer — it is predicting the probability of cancer developing in the future, making it valuable for deciding how frequently someone should be screened.',
    whatItCanDetect: 'Future lung cancer risk over 1 to 6 years. This is not detecting existing cancer — it predicts the probability of cancer developing in the future.',
    whoShouldUse: 'Pulmonologists, oncologists, or any doctor ordering lung cancer screening CTs. Especially useful for patients with smoking history or other risk factors.',
    inputDescription: 'Low-dose chest CT scan as a DICOM folder',
    inputFormats: ['DICOM folder'],
    acceptedExtensions: ['.dcm', '.zip'],
    maxFileSizeMB: 500,
    conditions: [
      { name: 'Lung cancer risk (1-year)' },
      { name: 'Lung cancer risk (2-year)' },
      { name: 'Lung cancer risk (3-year)' },
      { name: 'Lung cancer risk (4-year)' },
      { name: 'Lung cancer risk (5-year)' },
      { name: 'Lung cancer risk (6-year)' },
    ],
    performance: [
      { metric: 'AUC', value: '92%', dataset: '1-year lung cancer prediction' },
      { metric: 'Validated on', value: '27,000+', dataset: 'CT scans across 3 hospitals' },
    ],
    confidenceStatement: 'Sybil is one of the most validated AI models in medicine. Published in the Journal of Clinical Oncology, tested on over 27,000 CT scans across three major hospitals (including in Taiwan, showing cross-ethnic validity). Achieves 92% accuracy at predicting 1-year lung cancer risk. Deployed in 25 hospitals across 11 countries. However, a high-risk score does not mean cancer is certain, and a low-risk score does not guarantee safety.',
    outputDescription: '6 risk probabilities (year 1-6). Rendered as a line chart showing risk trajectory, plus a risk category (low/medium/high).',
    limitations: [
      'Predicts risk, not diagnosis — a high score does not mean cancer is present',
      'A low score does not guarantee safety',
      'Requires standard low-dose chest CT in DICOM format',
      'Results should inform — not replace — clinical screening decisions',
    ],
    paperTitle: 'Sybil: Validated AI for Lung Cancer Risk Prediction',
    paperJournal: 'Journal of Clinical Oncology',
    institution: 'MIT & Massachusetts General Hospital',
    computeType: 'gpu',
    costPerRun: 0.04,
    estimatedTime: '~10-30 seconds',
    ctaText: 'Upload and analyze',
    ctaHref: '/analyze/sybil',
  },
  {
    slug: 'mirai',
    name: 'Mirai',
    tagline: 'Five-year breast cancer risk from a standard mammogram',
    tier: 'active',
    tierLabel: 'Analyze Now',
    description: 'Upload a standard mammogram and get a personalized prediction of breast cancer risk over the next 1 to 5 years.',
    longDescription: 'Like Sybil for lung cancer, Mirai looks beyond what is currently visible in a mammogram to predict future risk. It does not detect existing tumors (that is what the radiologist reading the mammogram does), but predicts who is most likely to develop cancer in coming years. This is useful for deciding screening frequency and intensity.',
    whatItCanDetect: 'Future breast cancer risk over 1 to 5 years. Not detecting existing tumors — predicting who is most likely to develop cancer in coming years.',
    whoShouldUse: 'Radiologists, breast surgeons, gynecologists, and GPs managing breast cancer screening programs.',
    inputDescription: 'Standard 4-view mammogram as DICOM files (L CC, L MLO, R CC, R MLO)',
    inputFormats: ['DICOM files (4 views required)'],
    acceptedExtensions: ['.dcm', '.zip'],
    maxFileSizeMB: 200,
    conditions: [
      { name: 'Breast cancer risk (1-year)' },
      { name: 'Breast cancer risk (2-year)' },
      { name: 'Breast cancer risk (3-year)' },
      { name: 'Breast cancer risk (4-year)' },
      { name: 'Breast cancer risk (5-year)' },
    ],
    performance: [
      { metric: 'Validated on', value: '2M+', dataset: 'mammograms across 72 hospitals in 22 countries' },
    ],
    confidenceStatement: 'Mirai has been validated on over 2 million mammograms across 72 hospitals in 22 countries — one of the largest validations of any medical AI model. Published in Science Translational Medicine, developed at MIT and Massachusetts General Hospital. Works across different demographics and mammography devices. A high risk score means enhanced screening may be warranted — it does not mean cancer is present or inevitable.',
    outputDescription: '5 risk probabilities (year 1-5). Rendered as a risk trajectory chart with percentile comparison.',
    limitations: [
      'Predicts risk, not diagnosis — high risk does not mean cancer is present',
      'Requires all 4 standard mammogram views (L CC, L MLO, R CC, R MLO)',
      'Image quality affects accuracy — poor-quality mammograms produce less reliable results',
      'Should inform screening decisions, not replace clinical judgment',
    ],
    paperTitle: 'Mirai: Breast Cancer Risk Prediction',
    paperJournal: 'Science Translational Medicine',
    institution: 'MIT & Massachusetts General Hospital',
    computeType: 'gpu',
    costPerRun: 0.04,
    estimatedTime: '~15 seconds',
    ctaText: 'Upload and analyze',
    ctaHref: '/analyze/mirai',
  },
  {
    slug: 'chexpert',
    name: 'CheXpert',
    tagline: '14-condition screening from a single chest X-ray',
    tier: 'active',
    tierLabel: 'Analyze Now',
    description: 'Upload a chest X-ray and get probability scores for 14 common conditions. This is the most accessible model — every clinic has an X-ray machine, and this runs instantly with no special hardware.',
    longDescription: 'CheXpert analyzes a single chest X-ray image and produces probability scores for 14 common chest conditions. This is the most accessible model on the platform — every clinic in the Maldives has an X-ray machine, and this model runs instantly with no GPU required. It is particularly useful as a second-opinion tool for GPs in atoll health centers without specialist radiologists.',
    whatItCanDetect: 'Atelectasis, cardiomegaly (enlarged heart), consolidation, edema, pleural effusion (fluid around lungs), pneumonia, pneumothorax (collapsed lung), lung opacity, lung lesion, fracture, enlarged cardiomediastinum, support devices, and more.',
    whoShouldUse: 'Any doctor who orders chest X-rays. Particularly useful as a second-opinion tool for GPs in atoll health centers without specialist radiologists.',
    inputDescription: 'Single chest X-ray image — PNG, JPEG, or DICOM file. Standard PA (posteroanterior) view works best.',
    inputFormats: ['PNG', 'JPEG', 'DICOM'],
    acceptedExtensions: ['.png', '.jpg', '.jpeg', '.dcm'],
    maxFileSizeMB: 20,
    conditions: [
      { name: 'Atelectasis', description: 'Collapsed or partially collapsed lung' },
      { name: 'Cardiomegaly', description: 'Enlarged heart' },
      { name: 'Consolidation', description: 'Lung tissue filled with fluid' },
      { name: 'Edema', description: 'Fluid buildup in lungs' },
      { name: 'Pleural Effusion', description: 'Fluid around the lungs' },
      { name: 'Pneumonia', description: 'Lung infection' },
      { name: 'Pneumothorax', description: 'Collapsed lung' },
      { name: 'Lung Opacity', description: 'Abnormal white area on X-ray' },
      { name: 'Lung Lesion', description: 'Abnormal area in lung tissue' },
      { name: 'Fracture', description: 'Bone break visible on X-ray' },
      { name: 'Enlarged Cardiomediastinum', description: 'Widened central chest' },
      { name: 'Support Devices', description: 'Medical devices detected' },
      { name: 'No Finding', description: 'No abnormality detected' },
      { name: 'Pleural Other', description: 'Other pleural abnormality' },
    ],
    performance: [
      { metric: 'AUC', value: '0.90+', dataset: 'for major findings (effusion, cardiomegaly)' },
      { metric: 'Trained on', value: '224,000+', dataset: 'chest X-rays from Stanford' },
    ],
    confidenceStatement: 'These models are trained on over 224,000 chest X-rays from Stanford\'s CheXpert dataset. Accuracy varies by condition — strongest for large, obvious findings like pleural effusion and cardiomegaly (AUC 0.90+) and less reliable for subtle findings. It is a screening aid, not a diagnosis.',
    outputDescription: '14 probability scores. Rendered as a color-coded bar chart (green/amber/red) with plain-language explanations.',
    limitations: [
      'Accuracy varies by condition — better for obvious findings, less reliable for subtle ones',
      'A screening aid, not a diagnosis',
      'PA (posteroanterior) view works best — AP and lateral views may be less accurate',
      'Image quality significantly affects results',
    ],
    paperJournal: 'Stanford CheXpert Dataset',
    institution: 'Stanford University',
    computeType: 'cpu',
    costPerRun: 0,
    estimatedTime: '~2 seconds',
    ctaText: 'Upload and analyze',
    ctaHref: '/analyze/chexpert',
  },
  {
    slug: 'dr-screening',
    name: 'DR Screening',
    tagline: 'Diabetic eye disease screening from a fundus photo',
    tier: 'active',
    tierLabel: 'Analyze Now',
    description: 'Upload a photo of the back of the eye (retinal fundus photograph) and get an assessment of diabetic retinopathy severity. Early detection prevents blindness.',
    longDescription: 'This model grades diabetic retinopathy on a 5-point scale from a standard retinal fundus photograph. Early detection of diabetic retinopathy is critical because it is the leading cause of preventable blindness in working-age adults. This model helps screen patients who might not have access to an ophthalmologist — especially valuable in island health centers.',
    whatItCanDetect: 'Grades diabetic retinopathy severity: No DR (0), Mild (1), Moderate (2), Severe (3), Proliferative (4). Also flags whether the patient should be referred to a specialist.',
    whoShouldUse: 'GPs, endocrinologists, and any clinician managing diabetic patients. Especially valuable in island health centers without ophthalmologists.',
    inputDescription: 'Retinal fundus photograph — PNG or JPEG from any fundus camera',
    inputFormats: ['PNG', 'JPEG'],
    acceptedExtensions: ['.png', '.jpg', '.jpeg'],
    maxFileSizeMB: 20,
    conditions: [
      { name: 'No DR (Grade 0)', description: 'No diabetic retinopathy detected' },
      { name: 'Mild (Grade 1)', description: 'Mild nonproliferative DR' },
      { name: 'Moderate (Grade 2)', description: 'Moderate nonproliferative DR' },
      { name: 'Severe (Grade 3)', description: 'Severe nonproliferative DR' },
      { name: 'Proliferative (Grade 4)', description: 'Proliferative DR — requires urgent referral' },
    ],
    performance: [
      { metric: 'Accuracy', value: '97%+', dataset: 'for detecting referable DR (moderate or worse)' },
      { metric: 'Validated on', value: '88,000', dataset: 'images from EyePACS dataset' },
    ],
    confidenceStatement: 'Based on models validated against the 88,000-image EyePACS dataset, achieving over 97% accuracy for detecting referable (moderate or worse) diabetic retinopathy. The concept was validated in JAMA in 2016. However, image quality significantly affects results — poor-quality fundus photos produce unreliable scores. A normal result does not replace a comprehensive eye exam.',
    outputDescription: 'Severity grade (0-4) + probability distribution across grades. Rendered as a severity indicator with recommended follow-up actions.',
    limitations: [
      'Image quality significantly affects results — poor-quality photos produce unreliable scores',
      'A normal result does not replace a comprehensive eye exam',
      'Only screens for diabetic retinopathy — does not detect other eye conditions',
      'Requires a retinal fundus photograph from a fundus camera',
    ],
    paperJournal: 'JAMA (concept validation, 2016)',
    institution: 'Google / EyePACS',
    computeType: 'cpu',
    costPerRun: 0,
    estimatedTime: '~3 seconds',
    ctaText: 'Upload and analyze',
    ctaHref: '/analyze/dr-screening',
  },

  // ── Tier B: Hospital Integration ────────────────────
  {
    slug: 'totalsegmentator',
    name: 'TotalSegmentator',
    tagline: 'Map every organ in a CT or MRI scan',
    tier: 'hospital',
    tierLabel: 'Hospital Integration',
    description: 'Automatically identifies and measures 100+ anatomical structures in a CT or MRI scan — every major organ, bone, vessel, and muscle.',
    longDescription: 'TotalSegmentator does not detect diseases directly — it maps anatomy. It identifies and measures all major organs (liver, spleen, kidneys, pancreas, heart chambers), the entire skeleton, major blood vessels (aorta, vena cava, portal vein), muscles, and more. Abnormal organ sizes or shapes can indicate disease. This is useful for surgical planning, measuring organ volumes, and spotting abnormalities.',
    whatItCanDetect: 'Does not detect diseases directly — maps anatomy. Identifies and measures 100+ structures: all major organs, the entire skeleton, major blood vessels, muscles, and more.',
    whoShouldUse: 'Radiologists, surgeons (for surgical planning), and researchers doing organ volumetry studies.',
    inputDescription: 'CT or MRI scan as DICOM or NIfTI file',
    inputFormats: ['DICOM', 'NIfTI'],
    acceptedExtensions: ['.dcm', '.nii', '.nii.gz'],
    maxFileSizeMB: 500,
    conditions: [
      { name: 'Organ identification', description: 'All major organs individually labeled' },
      { name: 'Organ volumetry', description: 'Precise volume measurements' },
      { name: 'Skeletal mapping', description: 'Full skeleton segmentation' },
      { name: 'Vascular mapping', description: 'Major blood vessels identified' },
    ],
    performance: [
      { metric: 'Accuracy', value: '94%', dataset: 'on CT across all structures' },
      { metric: 'Accuracy', value: '84%', dataset: 'on MRI across all structures' },
    ],
    confidenceStatement: 'Winner of the RSNA Margulis Award (radiology\'s most prestigious research award). Published in Radiology: AI. Achieves 94% accuracy on CT and 84% on MRI across all structures. It is a measurement and mapping tool — interpreting what the measurements mean requires a physician.',
    outputDescription: '3D segmentation masks (NIfTI format) + organ volume measurements. Must be viewed in 3D Slicer or equivalent medical imaging software.',
    limitations: [
      'Produces 3D output that requires specialized viewing software (3D Slicer)',
      'Cannot be reduced to a meaningful PDF report',
      'Needs to be integrated into hospital radiology workstations',
      'Maps anatomy — does not diagnose disease',
    ],
    paperJournal: 'Radiology: AI',
    institution: 'University Hospital Basel',
    computeType: 'gpu',
    costPerRun: 0.02,
    estimatedTime: '~30 seconds',
    whyNotAvailable: 'TotalSegmentator produces a 3D organ map — a full volumetric dataset where each organ is individually labeled and measurable. This output needs to be viewed in specialized medical imaging software (such as 3D Slicer, which is free) where a radiologist can rotate, slice, and examine the segmentation interactively. Reducing this to a static PDF would lose most of its clinical value. For TotalSegmentator to be useful, it needs to be installed on a hospital radiology workstation where it integrates into the existing imaging workflow. The software is completely free and open-source.',
    ctaText: 'Contact us for hospital integration',
    ctaHref: 'mailto:info@policylabmv.com?subject=TotalSegmentator%20Integration',
  },
  {
    slug: 'medsam',
    name: 'MedSAM',
    tagline: 'Point at anything in a medical image and the AI outlines it',
    tier: 'hospital',
    tierLabel: 'Hospital Integration',
    description: 'An interactive tool where a doctor loads any medical image, draws a box around a structure of interest, and the AI precisely outlines it in real time.',
    longDescription: 'MedSAM is an interactive segmentation tool. A doctor loads any medical image — CT slice, MRI slice, ultrasound, X-ray, pathology image — draws a bounding box around a structure of interest, and the AI precisely outlines it in real time. This back-and-forth interaction is the entire point of the tool. It is useful for measuring tumors, organs, lesions, or any visible structure.',
    whatItCanDetect: 'Does not detect conditions — it outlines and measures any structure a doctor points to. Works across CT, MRI, ultrasound, X-ray, and pathology images.',
    whoShouldUse: 'Any clinician who needs to measure or outline a structure in a medical image. Researchers doing image analysis. Pathologists measuring lesion areas.',
    inputDescription: 'Any medical image — PNG, JPEG, DICOM slice, or NIfTI slice',
    inputFormats: ['PNG', 'JPEG', 'DICOM', 'NIfTI'],
    acceptedExtensions: ['.png', '.jpg', '.jpeg', '.dcm', '.nii'],
    maxFileSizeMB: 50,
    conditions: [
      { name: 'Interactive segmentation', description: 'Real-time structure outlining' },
      { name: 'Structure measurement', description: 'Area and volume calculations' },
    ],
    performance: [
      { metric: 'Dice score', value: '0.85+', dataset: 'for well-defined structures' },
      { metric: 'Validated on', value: '1.5M', dataset: 'image-mask pairs across 11 imaging types' },
    ],
    confidenceStatement: 'Published in Nature Communications, validated on 1.5 million image-mask pairs across 11 different imaging types. Very high accuracy for well-defined structures (Dice score 0.85+). Less accurate for structures with ambiguous boundaries. The segmentation is a measurement aid — clinical interpretation requires a physician.',
    outputDescription: 'Interactive — real-time segmentation overlays on medical images. Requires a live application, not a static report.',
    limitations: [
      'Interactive tool — requires real-time doctor interaction, cannot work as email service',
      'Less accurate for structures with ambiguous boundaries',
      'Needs to run as a live application on a hospital workstation',
      'A measurement aid — clinical interpretation requires a physician',
    ],
    paperJournal: 'Nature Communications',
    institution: 'Multiple institutions',
    computeType: 'gpu',
    costPerRun: 0.01,
    estimatedTime: '~1-2 seconds per interaction',
    whyNotAvailable: 'MedSAM is an interactive tool — the doctor draws a bounding box around a structure and sees the segmentation result instantly, then adjusts and redraws as needed. This back-and-forth interaction is the entire point of the tool. It cannot work as a file-in, email-out service. For MedSAM to be useful, it needs to run as a live application on a hospital workstation where clinicians can interact with it in real time. The software is completely free and open-source.',
    ctaText: 'Contact us for hospital integration',
    ctaHref: 'mailto:info@policylabmv.com?subject=MedSAM%20Integration',
  },

  // ── Tier C: Coming Soon ─────────────────────────────
  {
    slug: 'gigatime',
    name: 'GigaTIME',
    tagline: 'See your tumor\'s immune landscape from a standard biopsy slide',
    tier: 'coming_soon',
    tierLabel: 'Coming Soon',
    description: 'Takes a standard H&E-stained biopsy slide and predicts what an expensive multiplex immunofluorescence test would show — mapping 21 immune proteins.',
    longDescription: 'GigaTIME takes a standard H&E-stained biopsy slide (the $5 slide every cancer patient already has) and predicts what an expensive multiplex immunofluorescence test would show — mapping 21 immune proteins to reveal whether the immune system is actively fighting the tumor or ignoring it. This information is critical for deciding whether immunotherapy will work. The model is open-source and published in Cell, but requires a digitized whole-slide image from a slide scanner that costs $18,000-22,000. No hospital in the Maldives currently has one.',
    whatItCanDetect: 'Tumor microenvironment classification (immune-inflamed "hot" vs immune-desert "cold"), predicted expression of 21 protein markers including PD-L1, CD8, CD3, FoxP3, and other checkpoint and immune cell markers. Directly informs immunotherapy treatment decisions.',
    whoShouldUse: 'Oncologists, pathologists, and researchers studying tumor immunology.',
    inputDescription: 'Digitized whole-slide image (requires a slide scanner ~$18K-22K)',
    inputFormats: ['Whole-slide image (SVS, TIFF)'],
    acceptedExtensions: ['.svs', '.tiff', '.tif'],
    maxFileSizeMB: 5000,
    conditions: [
      { name: 'Immune-inflamed ("hot") tumor' },
      { name: 'Immune-desert ("cold") tumor' },
      { name: 'PD-L1 expression prediction' },
      { name: 'CD8+ T-cell infiltration' },
      { name: 'CD3 expression' },
      { name: 'FoxP3 regulatory T-cells' },
      { name: '+ 15 more immune markers' },
    ],
    performance: [
      { metric: 'Concordance', value: '0.88', dataset: 'with actual multiplex immunofluorescence' },
      { metric: 'Validated on', value: '14,256', dataset: 'patients across 51 hospitals' },
      { metric: 'Trained on', value: '40M', dataset: 'cells' },
    ],
    confidenceStatement: 'Published in Cell (one of the most selective journals in biology). Trained on 40 million cells. Validated on 14,256 patients across 51 hospitals. Achieves 0.88 concordance with actual multiplex immunofluorescence. The model is open-source on HuggingFace.',
    outputDescription: 'Virtual immune profile showing 21 protein marker predictions and tumor microenvironment classification.',
    limitations: [
      'Requires a digitized whole-slide image from a slide scanner (~$18K-22K)',
      'No hospital in the Maldives currently has the required equipment',
      'A prediction of what immunofluorescence would show — not the actual test',
      'Results must be interpreted by a pathologist or oncologist',
    ],
    paperJournal: 'Cell',
    institution: 'Multiple institutions',
    computeType: 'gpu',
    costPerRun: 0.10,
    estimatedTime: '~2-5 minutes',
    whyNotAvailable: 'This model requires a digitized whole-slide image — a gigapixel scan of the biopsy slide. Producing this scan requires a whole-slide scanner, which costs approximately $18,000-22,000. No hospital in the Maldives currently has one. When one does, we will activate this model immediately.',
    ctaText: 'Help bring this to the Maldives',
    ctaHref: 'mailto:info@policylabmv.com?subject=GigaTIME%20Equipment%20Funding',
  },
]

// ── Helper functions ────────────────────────────────────

export function getModelBySlug(slug: string): ModelInfo | undefined {
  return MODELS.find((m) => m.slug === slug)
}

export function getModelsByTier(tier: ModelTier): ModelInfo[] {
  return MODELS.filter((m) => m.tier === tier)
}

export function getActiveModels(): ModelInfo[] {
  return getModelsByTier('active')
}

export function getHospitalModels(): ModelInfo[] {
  return getModelsByTier('hospital')
}

export function getComingSoonModels(): ModelInfo[] {
  return getModelsByTier('coming_soon')
}

export function getAllModels(): ModelInfo[] {
  return MODELS
}
