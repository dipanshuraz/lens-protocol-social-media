export default function ipfsToHttp(ipfsUrl) {
    if (!ipfsUrl.startsWith('ipfs://')) return ipfsUrl;

    const ipfsHash = ipfsUrl.replace('ipfs://', '');
    return `https://ipfs.io/ipfs/${ipfsHash}`;
}
