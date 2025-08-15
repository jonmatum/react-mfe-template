# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-15

### Added

#### Core Template Features
- **Atomic Design Architecture**: Complete component structure with Atoms, Molecules, and Organisms
- **TypeScript Support**: Strict TypeScript configuration with comprehensive type definitions
- **Modern Build System**: tsup for library builds, Vite for development with React SWC
- **Testing Infrastructure**: Vitest with 90%+ coverage thresholds and Happy DOM environment
- **Quality Tooling**: ESLint, Prettier, and comprehensive linting rules

#### Components
- **Button Atom**: Configurable button with variants (primary, secondary, ghost) and sizes
- **LoadingSpinner Atom**: Animated loading indicator with customizable sizes and text
- **Switch Atom**: Toggle switch component for settings and preferences
- **Modal Molecule**: Accessible modal dialog with backdrop and keyboard support

#### Design System
- **Design Tokens**: Comprehensive token system with colors, typography, spacing, shadows
- **Theme Support**: Light, dark, and system theme modes with automatic detection
- **WCAG AA Compliance**: Color tokens and components designed for accessibility
- **Responsive Design**: Mobile-first approach with consistent breakpoints

#### State Management
- **Settings Context**: Global state management for theme and layout preferences
- **Local Storage**: Persistent settings with error handling and fallbacks
- **Theme Management**: Automatic system theme detection and switching

#### Developer Experience
- **Format Script**: Safe code formatting with Prettier and ESLint auto-fix
- **Pre-commit Hooks**: Comprehensive pre-commit configuration for code quality
- **Node Version**: .nvmrc file for consistent Node.js version (18+)
- **Markdown Linting**: Configuration for consistent documentation formatting

#### Build & Distribution
- **Library Exports**: Proper ESM and CJS builds with TypeScript declarations
- **Peer Dependencies**: Externalized React, React DOM, and Heroicons
- **Source Maps**: Generated for debugging in development and production
- **Bundle Analysis**: Built-in bundle analysis capabilities

#### Documentation
- **Comprehensive README**: Detailed usage instructions and examples
- **Example Application**: Complete example showing all components and features
- **API Documentation**: TypeScript interfaces and component props
- **Best Practices**: Guidelines for component development and usage

#### Template Optimizations
- **MIT License**: Template-friendly license for maximum adoption
- **Clean Structure**: Organized directory structure following atomic design
- **Production Ready**: 95%+ quality score patterns from proven MFE architecture
- **Extensible**: Easy to add new components and features

### Technical Specifications
- **React**: 18.0.0+
- **TypeScript**: 5.8.3
- **Vite**: 7.1.2
- **Tailwind CSS**: 3.4.0
- **Heroicons**: 2.0.0+
- **Node.js**: 18.0.0+
- **npm**: 9.0.0+

### Package Information
- **Name**: react-mfe-template
- **Version**: 1.0.0
- **License**: MIT
- **Repository**: https://github.com/jonmatum/react-mfe-template
- **Author**: Jonathan Matum

[1.0.0]: https://github.com/jonmatum/react-mfe-template/releases/tag/v1.0.0
